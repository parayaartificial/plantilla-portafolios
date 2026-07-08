// Inyección de Datos y Animaciones
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar datos UI
    document.getElementById('ui-name').textContent = portfolioData.personal.name;
    document.getElementById('ui-role').textContent = portfolioData.personal.role;
    document.getElementById('ui-summary').textContent = portfolioData.personal.summary;
    document.getElementById('ui-linkedin').href = portfolioData.personal.linkedin;

    const btnWa = document.getElementById('ui-whatsapp');
    if (btnWa && portfolioData.personal.phone) {
        const phoneClean = portfolioData.personal.phone.replace(/\D/g, '');
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
    portfolioData.experience.forEach(job => {
        expContainer.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <h4>${job.company} • ${job.period}</h4>
                <p>${job.description}</p>
            </div>
        `;
    });

    const eduContainer = document.getElementById('ui-education');
    portfolioData.education.forEach(edu => {
        eduContainer.innerHTML += `
            <div class="edu-card">
                <h3>${edu.degree}</h3>
                <p>${edu.institution}<br>${edu.year}</p>
            </div>
        `;
    });

    const skillsContainer = document.getElementById('ui-skills');
    portfolioData.skills.forEach(skill => {
        skillsContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
    });

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
