// Datos de ejemplo de tu scanlation
const mangasData = [
    {
        id: 1,
        title: "Shadow Warrior",
        cover: "img/shadow_warrior.jpg",
        genre: ["accion", "fantasia"],
        description: "Un guerrero oscuro busca venganza",
        status: "En emisión"
    },
    {
        id: 2,
        title: "Dragon Rising",
        cover: "img/dragon_rising.jpg",
        genre: ["aventura", "fantasia"],
        description: "La leyenda del dragón ancestral",
        status: "Completado"
    }
];

const chaptersData = [
    { id: 1, mangaId: 1, number: 1, title: "El Despertar", date: "2024-01-15", pages: 25 },
    { id: 2, mangaId: 1, number: 2, title: "El Encuentro", date: "2024-01-20", pages: 22 }
];

// Funciones globales
function loadRecentChapters() {
    const recent = [...chaptersData].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    const container = document.getElementById('recentChapters');
    if (container) {
        container.innerHTML = recent.map(ch => `
            <a href="lector.html?manga=${ch.mangaId}&cap=${ch.id}" class="chapter-item">
                <div>
                    <strong>${getMangaTitle(ch.mangaId)}</strong> - Capítulo ${ch.number}: ${ch.title}
                </div>
                <div>${formatDate(ch.date)}</div>
            </a>
        `).join('');
    }
}

function loadPopularMangas() {
    const container = document.getElementById('popularMangas');
    if (container) {
        container.innerHTML = mangasData.slice(0, 4).map(manga => `
            <a href="manga.html?id=${manga.id}" class="manga-card">
                <img class="manga-cover" src="${manga.cover}" alt="${manga.title}">
                <div class="manga-info">
                    <div class="manga-title">${manga.title}</div>
                    <div>${chaptersData.filter(c => c.mangaId === manga.id).length} caps</div>
                </div>
            </a>
        `).join('');
    }
}

function loadMangaDetail(mangaId) {
    const manga = mangasData.find(m => m.id == mangaId);
    if (manga) {
        document.title = `${manga.title} | MangaScan`;
        const container = document.getElementById('mangaDetail');
        container.innerHTML = `
            <div class="manga-detail-grid">
                <img src="${manga.cover}" alt="${manga.title}" class="detail-cover">
                <div class="detail-info">
                    <h1>${manga.title}</h1>
                    <p>${manga.description}</p>
                    <p>Estado: ${manga.status}</p>
                    <p>Géneros: ${manga.genre.join(', ')}</p>
                </div>
            </div>
        `;
    }
}

function loadChaptersList(mangaId) {
    const chapters = chaptersData.filter(c => c.mangaId == mangaId).sort((a,b) => b.number - a.number);
    const container = document.getElementById('chaptersList');
    container.innerHTML = chapters.map(ch => `
        <a href="lector.html?manga=${mangaId}&cap=${ch.id}" class="chapter-item">
            <div>Capítulo ${ch.number}: ${ch.title}</div>
            <div>${formatDate(ch.date)}</div>
        </a>
    `).join('');
}

function loadReader(mangaId, chapterId) {
    const chapter = chaptersData.find(c => c.id == chapterId);
    const manga = mangasData.find(m => m.id == mangaId);
    
    if (chapter && manga) {
        document.title = `${manga.title} - Capítulo ${chapter.number} | MangaScan`;
        
        // Generar páginas (aquí cargas tus imágenes reales)
        const pagesContainer = document.getElementById('pagesContainer');
        let pages = '';
        for (let i = 1; i <= chapter.pages; i++) {
            pages += `<img class="manga-page" src="chapters/${mangaId}/cap${chapter.number}/${String(i).padStart(2,'0')}.jpg" alt="Página ${i}">`;
        }
        pagesContainer.innerHTML = pages;
        
        document.getElementById('readerInfo').innerHTML = `${manga.title} - Capítulo ${chapter.number}: ${chapter.title}`;
        
        // Navegación entre capítulos
        const chapterIndex = chaptersData.findIndex(c => c.id == chapterId);
        const prevBtn = document.getElementById('prevChapter');
        const nextBtn = document.getElementById('nextChapter');
        
        if (chapterIndex > 0) {
            const prev = chaptersData[chapterIndex - 1];
            prevBtn.href = `lector.html?manga=${prev.mangaId}&cap=${prev.id}`;
        } else {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        }
        
        if (chapterIndex < chaptersData.length - 1) {
            const next = chaptersData[chapterIndex + 1];
            nextBtn.href = `lector.html?manga=${next.mangaId}&cap=${next.id}`;
        } else {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        }
    }
}

function getMangaTitle(mangaId) {
    const manga = mangasData.find(m => m.id === mangaId);
    return manga ? manga.title : 'Desconocido';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES');
}

function filterMangas() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = mangasData.filter(m => m.title.toLowerCase().includes(searchTerm));
    // Actualizar grid con resultados
}

function filterByGenre(genre) {
    // Filtrar por género
}