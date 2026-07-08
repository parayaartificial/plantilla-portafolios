const fs = require('fs');
const path = require('path');

const profiles = [
    { id:"carlos-ruiz", name:"Carlos Ruiz", role:"Ingeniero en Informática", tags:["ingeniería", "informática", "desarrollo", "backend", "software"], summary:"Especialista en desarrollo backend y arquitecturas escalables." },
    { id:"ana-silva", name:"Ana Silva", role:"Diseñadora UX/UI", tags:["diseño", "ux", "ui", "interfaces", "figma"], summary:"Diseñadora centrada en el usuario con 5 años de experiencia." },
    { id:"luis-torres", name:"Luis Torres", role:"Arquitecto Cloud", tags:["cloud", "aws", "gcp", "devops", "infraestructura"], summary:"Experto en migraciones a la nube y automatización." },
    { id:"maria-gomez", name:"María Gómez", role:"Científica de Datos", tags:["datos", "data science", "machine learning", "python", "ai"], summary:"Analista predictiva y experta en IA generativa." },
    { id:"juan-perez", name:"Juan Pérez", role:"Gerente de Proyectos", tags:["gerencia", "proyectos", "scrum", "agile", "pmp"], summary:"Líder ágil orientado a la entrega de valor y equipos de alto rendimiento." }
];

const db = [];

profiles.forEach(p => {
    const dir = path.join(__dirname, 'perfiles', p.id);
    const dataJs = `const portfolioData = {
    personal: { name: "${p.name}", role: "${p.role}", email: "contacto@ejemplo.com", phone: "+123", location: "Remoto", linkedin: "#", summary: "${p.summary}" },
    experience: [], education: [], skills: ["${p.tags[0]}", "${p.tags[1]}"]
};`;
    fs.writeFileSync(path.join(dir, 'data.js'), dataJs, 'utf8');
    db.push({
        id: p.id,
        name: p.name,
        role: p.role,
        tags: p.tags,
        url: `/perfiles/${p.id}/`
    });
});

fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(db, null, 2), 'utf8');
console.log('UTF-8 Fixed!');
