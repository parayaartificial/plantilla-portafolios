// Inyección de Datos y Animaciones
document.addEventListener('DOMContentLoaded', () => {
    if (typeof portfolioData === 'undefined') return;

    const { personal, experience, education, skills } = portfolioData;

    // 1. Inyectar datos UI
    const uiName = document.getElementById('ui-name');
    const uiRole = document.getElementById('ui-role');
    const uiSummary = document.getElementById('ui-summary');
    const uiLinkedin = document.getElementById('ui-linkedin');

    if (uiName) uiName.textContent = personal.name || '';
    if (uiRole) uiRole.textContent = personal.role || '';
    if (uiSummary) uiSummary.textContent = personal.summary || '';
    if (uiLinkedin) uiLinkedin.href = personal.linkedin || '#';

    const btnWa = document.getElementById('ui-whatsapp');
    if (btnWa && personal.phone) {
        const phoneClean = personal.phone.replace(/\D/g, '');
        btnWa.href = `https://wa.me/${phoneClean}`;
    }

    const btnPdf = document.getElementById('ui-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }

    const expContainer = document.getElementById('ui-experience');
    if (expContainer && experience && experience.length > 0) {
        experience.forEach(job => {
            expContainer.innerHTML += `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <h4>${job.company} • ${job.period}</h4>
                    <p>${job.description}</p>
                </div>
            `;
        });
    }

    const eduContainer = document.getElementById('ui-education');
    if (eduContainer && education && education.length > 0) {
        education.forEach(edu => {
            eduContainer.innerHTML += `
                <div class="edu-card">
                    <h3>${edu.degree}</h3>
                    <p>${edu.institution}<br>${edu.year}</p>
                </div>
            `;
        });
    }

    const skillsContainer = document.getElementById('ui-skills');
    if (skillsContainer && skills && skills.length > 0) {
        skills.forEach(skill => {
            skillsContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
        });
    }

    // 2. ATS Schema Inyection
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": portfolioData.personal.name,
        "jobTitle": portfolioData.personal.role,
        "email": portfolioData.personal.email,
        "url": window.location.href,
        "sameAs": [portfolioData.personal.linkedin],
        "description": portfolioData.personal.summary,
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

    // 3. Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
});
