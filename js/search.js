document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const resultsGrid = document.getElementById('resultsGrid');
    const searchStats = document.getElementById('searchStats');
    
    let db = [];

    // Fetch database
    try {
        const response = await fetch('/database.json');
        db = await response.json();
        renderResults(db);
        searchStats.textContent = `${db.length} perfiles indexados.`;
    } catch (error) {
        console.error("Error cargando la base de datos", error);
        searchStats.textContent = "Error de conexión con el directorio.";
    }

    // Search Engine (Fuzzy simple)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            renderResults(db);
            searchStats.textContent = `${db.length} perfiles indexados.`;
            return;
        }

        const filtered = db.filter(profile => {
            const matchName = profile.name.toLowerCase().includes(query);
            const matchRole = profile.role.toLowerCase().includes(query);
            const matchTags = profile.tags.some(tag => tag.toLowerCase().includes(query));
            return matchName || matchRole || matchTags;
        });

        renderResults(filtered);
        searchStats.textContent = `${filtered.length} resultados para "${query}".`;
    });

    // Render Function
    function renderResults(profiles) {
        resultsGrid.innerHTML = '';
        
        if (profiles.length === 0) {
            resultsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No se encontraron perfiles</h3>
                    <p>Intenta con otras palabras clave como "ingeniería", "ux" o nombres específicos.</p>
                </div>
            `;
            return;
        }

        profiles.forEach(p => {
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
    }
    
    setTimeout(() => {
        document.querySelector('.portal-header').classList.add('visible');
    }, 100);
});
