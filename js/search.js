document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const resultsGrid = document.getElementById('resultsGrid');
    const searchStats = document.getElementById('searchStats');
    const chips = document.querySelectorAll('.chip');
    const observerTarget = document.getElementById('observer-target');
    
    let db = [];
    let currentFiltered = [];
    let activeFilters = new Set();
    
    // Pagination state
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;

    // Fetch database
    try {
        const response = await fetch('/database.json');
        db = await response.json();
        currentFiltered = [...db];
        renderPage();
    } catch (error) {
        console.error("Error cargando la base de datos", error);
        searchStats.textContent = "Error de conexión con el directorio.";
    }

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.getAttribute('data-filter');
            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                chip.classList.remove('active');
            } else {
                activeFilters.add(filter);
                chip.classList.add('active');
            }
            applyFilters();
        });
    });

    // Core Filter Logic
    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        
        currentFiltered = db.filter(profile => {
            // 1. Text Search
            let matchesText = true;
            if (query) {
                const textTarget = `${profile.name} ${profile.role} ${profile.tags.join(' ')}`.toLowerCase();
                matchesText = textTarget.includes(query);
            }
            
            // 2. Chip Filters
            let matchesChips = true;
            if (activeFilters.size > 0) {
                const profileTagsLower = profile.tags.map(t => t.toLowerCase());
                // Must have ALL active filters
                matchesChips = Array.from(activeFilters).every(filter => 
                    profileTagsLower.some(t => t.includes(filter))
                );
            }

            return matchesText && matchesChips;
        });

        // Reset pagination
        currentPage = 1;
        resultsGrid.innerHTML = '';
        renderPage();
    }

    // Virtual Pagination Render
    function renderPage() {
        if (currentFiltered.length === 0) {
            resultsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No se encontraron perfiles</h3>
                    <p>Intenta quitando filtros o cambiando la palabra clave.</p>
                </div>
            `;
            searchStats.textContent = `0 resultados.`;
            return;
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const toRender = currentFiltered.slice(startIndex, endIndex);

        toRender.forEach(p => {
            const tagsHtml = p.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const cardHtml = `
                <a href="${p.url}" class="profile-card fade-up visible">
                    <h3 class="profile-name">${p.name}</h3>
                    <p class="profile-role">${p.role}</p>
                    <div class="profile-tags">${tagsHtml}</div>
                </a>
            `;
            resultsGrid.innerHTML += cardHtml;
        });

        searchStats.textContent = `Mostrando ${Math.min(endIndex, currentFiltered.length)} de ${currentFiltered.length} perfiles.`;
    }

    // Intersection Observer for Infinite Scroll
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (currentPage * ITEMS_PER_PAGE < currentFiltered.length) {
                currentPage++;
                renderPage();
            }
        }
    }, { rootMargin: '100px' });

    if (observerTarget) {
        observer.observe(observerTarget);
    }

    setTimeout(() => {
        const header = document.querySelector('.portal-header');
        if(header) header.classList.add('visible');
    }, 100);
});
