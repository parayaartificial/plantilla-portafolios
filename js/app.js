// Inyección de Datos y Generación ATS
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar datos en la interfaz visual (Humana)
    document.getElementById('ui-name').textContent = portfolioData.personal.name;
    document.getElementById('ui-role').textContent = portfolioData.personal.role;
    document.getElementById('ui-summary').textContent = portfolioData.personal.summary;
    document.getElementById('ui-email').href = `mailto:${portfolioData.personal.email}`;
    document.getElementById('ui-linkedin').href = portfolioData.personal.linkedin;

    const expContainer = document.getElementById('ui-experience');
    portfolioData.experience.forEach(job => {
        expContainer.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <h4>${job.company} <span>| ${job.period}</span></h4>
                <p>${job.description}</p>
            </div>
        `;
    });

    const eduContainer = document.getElementById('ui-education');
    portfolioData.education.forEach(edu => {
        eduContainer.innerHTML += `
            <div class="edu-card">
                <h3>${edu.degree}</h3>
                <p>${edu.institution} | ${edu.year}</p>
            </div>
        `;
    });

    const skillsContainer = document.getElementById('ui-skills');
    portfolioData.skills.forEach(skill => {
        skillsContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
    });

    // 2. Inyectar JSON-LD (Schema.org) para lectura pura de IAs (ATS)
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": portfolioData.personal.name,
        "jobTitle": portfolioData.personal.role,
        "email": portfolioData.personal.email,
        "url": window.location.href,
        "sameAs": [portfolioData.personal.linkedin],
        "description": portfolioData.personal.summary,
        "alumniOf": portfolioData.education.map(e => ({
            "@type": "OrganizationRole",
            "alumniOf": { "@type": "EducationalOrganization", "name": e.institution }
        })),
        "worksFor": portfolioData.experience.map(job => ({
            "@type": "EmployeeRole",
            "roleName": job.title,
            "worksFor": { "@type": "Organization", "name": job.company }
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
});
