/* ========================================
   CV JavaScript - Striking
   ======================================== */

document.addEventListener('DOMContentLoaded', async () => {
    // Load data
    let data;
    try {
        const response = await fetch('/data.json');
        data = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        return;
    }

    const { personal, experience, projects, skills, branding, metrics } = data;

    // Render Hero
    document.getElementById('heroRole').textContent = personal.role;
    document.getElementById('heroSummary').textContent = personal.summary;

    // Render Experience Timeline
    const timeline = document.getElementById('experienceTimeline');
    experience.forEach(job => {
        const highlights = job.highlights.map(h => `<li>${h}</li>`).join('');
        const tags = job.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('');
        
        timeline.innerHTML += `
            <div class="timeline-item fade-up ${job.current ? 'current' : ''}">
                <div class="timeline-header">
                    <span class="timeline-title">${job.title}</span>
                    <span class="timeline-period">${job.period}</span>
                </div>
                <div class="timeline-company">${job.company}</div>
                <p class="timeline-description">${job.description}</p>
                <ul class="timeline-highlights">${highlights}</ul>
                <div class="timeline-tags">${tags}</div>
            </div>
        `;
    });

    // Render Projects
    const projectsGrid = document.getElementById('projectsGrid');
    projects.forEach(project => {
        const tech = project.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');
        
        projectsGrid.innerHTML += `
            <div class="project-card fade-up">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${tech}</div>
            </div>
        `;
    });

    // Render Skills
    const skillsGrid = document.getElementById('skillsGrid');
    Object.values(skills).forEach(category => {
        const items = category.items.map(s => `<span class="skill-tag">${s}</span>`).join('');
        
        skillsGrid.innerHTML += `
            <div class="skill-category fade-up">
                <div class="skill-category-header">
                    <span class="skill-category-icon">${category.icon}</span>
                    <span class="skill-category-label">${category.label}</span>
                </div>
                <div class="skill-items">${items}</div>
            </div>
        `;
    });

    // Initialize QR Code
    initQR();

    // Initialize Animations
    initAnimations();

    // Initialize Navigation
    initNavigation();

    // Inject JSON-LD Schema
    injectSchema(personal, experience);
});

/* ========================================
   QR Code Generation
   ======================================== */

let qrInstance = null;

function initQR() {
    const qrContainer = document.getElementById('qrCode');
    if (!qrContainer) return;

    qrInstance = new QRCode(qrContainer, {
        text: window.location.href,
        width: 200,
        height: 200,
        colorDark: '#1a1a2e',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const canvas = document.querySelector('#qrCode canvas');
    if (!canvas) return;

    // Create a new canvas with logo
    const finalCanvas = document.createElement('canvas');
    const size = canvas.width + 80;
    finalCanvas.width = size;
    finalCanvas.height = size;
    const ctx = finalCanvas.getContext('2d');

    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 20);
    ctx.fill();

    // Draw QR code
    ctx.drawImage(canvas, 40, 40);

    // Draw logo in center
    const logoSize = 40;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;

    // Logo background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(logoX - 6, logoY - 6, logoSize + 12, logoSize + 12, 8);
    ctx.fill();

    // Draw lightning bolt
    const gradient = ctx.createLinearGradient(logoX, logoY, logoX + logoSize, logoY + logoSize);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#8B5CF6');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    const cx = logoX + logoSize / 2;
    const cy = logoY + logoSize / 2;
    ctx.moveTo(cx - 4, cy - 16);
    ctx.lineTo(cx - 12, cy + 2);
    ctx.lineTo(cx - 4, cy + 2);
    ctx.lineTo(cx - 8, cy + 16);
    ctx.lineTo(cx + 8, cy - 2);
    ctx.lineTo(cx + 0, cy - 2);
    ctx.lineTo(cx + 4, cy - 16);
    ctx.closePath();
    ctx.fill();

    // Download
    const link = document.createElement('a');
    link.download = 'striking-qr-patricio-araya.png';
    link.href = finalCanvas.toDataURL('image/png');
    link.click();
}

/* ========================================
   Scroll Animations
   ======================================== */

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate metrics counters
                if (entry.target.querySelector('.metric-number')) {
                    animateCounter(entry.target.querySelector('.metric-number'));
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';

    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        element.textContent = Math.floor(eased * target);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   Navigation
   ======================================== */

function initNavigation() {
    const nav = document.getElementById('cvNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ========================================
   JSON-LD Schema (ATS/SEO)
   ======================================== */

function injectSchema(personal, experience) {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": personal.name,
        "jobTitle": personal.role,
        "email": personal.email,
        "url": window.location.href,
        "sameAs": [personal.linkedin],
        "description": personal.summary,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": personal.location
        },
        "worksFor": experience.map(job => ({
            "@type": "EmployeeRole",
            "roleName": job.title,
            "worksFor": {
                "@type": "Organization",
                "name": job.company
            }
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}
