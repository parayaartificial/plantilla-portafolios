document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const statusBox = document.getElementById('statusBox');
    
    // URL del worker desplegado en Cloudflare
    const WORKER_URL = "https://admin-worker.striking.workers.dev/api/save";
    
    btn.disabled = true;
    statusBox.className = 'status-box loading';
    statusBox.innerHTML = '⏳ Preparando despliegue... Generando archivos y conectando con GitHub.';

    const payload = {
        id: document.getElementById('id').value.trim(),
        name: document.getElementById('name').value.trim(),
        role: document.getElementById('role').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        summary: document.getElementById('summary').value.trim(),
        tags: document.getElementById('tags').value.split(',').map(t => t.trim().toLowerCase())
    };

    try {
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            statusBox.className = 'status-box success';
            statusBox.innerHTML = `✅ ¡Despliegue Exitoso!<br>El perfil <b>${payload.name}</b> ha sido subido a GitHub (Commit: ${result.commit.substring(0,7)}). Cloudflare lo publicará en unos 30 segundos. <a href="/" style="color:var(--secondary)">Volver al directorio</a>`;
            document.getElementById('profileForm').reset();
        } else {
            throw new Error(result.error || 'Error desconocido del servidor');
        }
    } catch (error) {
        statusBox.className = 'status-box error';
        statusBox.innerHTML = `❌ Error: ${error.message}<br>Asegúrate de que la URL del Worker sea correcta y tengas internet.`;
    } finally {
        btn.disabled = false;
    }
});
