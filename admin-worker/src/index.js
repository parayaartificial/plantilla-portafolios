export default {
  async fetch(request, env, ctx) {
    // CORS Handling
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const data = await request.json();
      const REPO = env.GITHUB_REPO;
      const TOKEN = env.GITHUB_TOKEN;
      const DOMAIN = "https://striking-sites.com";

      if (!REPO || !TOKEN) throw new Error("Falta configuración de entorno (GITHUB_REPO o GITHUB_TOKEN).");

      // 1. Obtener la plantilla HTML en vivo
      const htmlRes = await fetch(`${DOMAIN}/perfiles/plantilla_cv/index.html`);
      if (!htmlRes.ok) throw new Error("No se pudo obtener la plantilla HTML.");
      const templateHtml = await htmlRes.text();

      // 2. Obtener la base de datos en vivo
      const dbRes = await fetch(`${DOMAIN}/database.json?time=${Date.now()}`);
      let db = [];
      if (dbRes.ok) db = await dbRes.json();

      // Verificar si existe el ID
      if (db.find(p => p.id === data.id)) throw new Error("El Identificador (URL) ya existe.");

      // Actualizar DB
      db.push({
        id: data.id,
        name: data.name,
        role: data.role,
        tags: data.tags,
        url: `/perfiles/${data.id}/`
      });

      // Generar data.js
      const dataJsContent = `const portfolioData = {
    personal: { name: "${data.name}", role: "${data.role}", email: "no-reply@ejemplo.com", phone: "${data.phone}", location: "Remoto", linkedin: "${data.linkedin}", summary: "${data.summary}" },
    experience: [], education: [], skills: ${JSON.stringify(data.tags)}
};`;

      // --- INICIO RUTINA GITHUB API ---
      const headers = {
        "Authorization": `Bearer ${TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Cloudflare-CMS-Worker"
      };

      // 3. Obtener el HEAD de main
      const refRes = await fetch(`https://api.github.com/repos/${REPO}/git/ref/heads/main`, { headers });
      if (!refRes.ok) throw new Error(`Falló al obtener ref: ${await refRes.text()}`);
      const refData = await refRes.json();
      const baseCommitSha = refData.object.sha;

      // 4. Obtener el commit base para sacar el base_tree
      const commitRes = await fetch(`https://api.github.com/repos/${REPO}/git/commits/${baseCommitSha}`, { headers });
      const commitData = await commitRes.json();
      const baseTreeSha = commitData.tree.sha;

      // 5. Crear el nuevo Tree (Subir archivos)
      const treePayload = {
        base_tree: baseTreeSha,
        tree: [
          { path: "database.json", mode: "100644", type: "blob", content: JSON.stringify(db, null, 2) },
          { path: `perfiles/${data.id}/index.html`, mode: "100644", type: "blob", content: templateHtml },
          { path: `perfiles/${data.id}/data.js`, mode: "100644", type: "blob", content: dataJsContent }
        ]
      };

      const treePostRes = await fetch(`https://api.github.com/repos/${REPO}/git/trees`, {
        method: "POST", headers, body: JSON.stringify(treePayload)
      });
      if (!treePostRes.ok) throw new Error("Falló al crear el Tree en GitHub");
      const treePostData = await treePostRes.json();
      const newTreeSha = treePostData.sha;

      // 6. Crear el Commit
      const commitPayload = {
        message: `CMS: Añadido nuevo perfil - ${data.name}`,
        tree: newTreeSha,
        parents: [baseCommitSha]
      };
      const newCommitRes = await fetch(`https://api.github.com/repos/${REPO}/git/commits`, {
        method: "POST", headers, body: JSON.stringify(commitPayload)
      });
      const newCommitData = await newCommitRes.json();
      const newCommitSha = newCommitData.sha;

      // 7. Actualizar la rama main
      const updateRefRes = await fetch(`https://api.github.com/repos/${REPO}/git/refs/heads/main`, {
        method: "PATCH", headers, body: JSON.stringify({ sha: newCommitSha })
      });
      if (!updateRefRes.ok) throw new Error("Falló al actualizar la rama main");

      return new Response(JSON.stringify({ success: true, commit: newCommitSha }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
