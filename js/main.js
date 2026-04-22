// ============================================
// DATOS DE TU SCANLATION
// ============================================

const mangasData = [
    {
        id: 1,
        title: "Karakai Jouzu No (Moto) Takagi-san",
        title_alt: "La maestra bromista Takagi-san (Madre)",
        author: "Inaba Mifumi / Yamamoto Souichirou",
        cover: "https://raw.githubusercontent.com/ragnarokscan/ragnarokscan.github.io/refs/heads/main/covers/Karakai%20Jouzu%20No%20(Moto)%20Takagi-san.jpg",
        genre: ["Comedia", "Romance", "Recuentos de la vida"],
        description: "Spin-off de 'Karakai Jouzu no Takagi-san!' La ahora ex Takagi-san y su hija Chi-chan nos traen esta comedia bromista casera. ¿El papá aparecerá también? Una historia familiar llena de risas y momentos tiernos.",
        status: "En emisión",
        rating: 4.8
    },
    {
        id: 2,
        title: "Soredemo Ayumu Wa Yosetekuru",
        title_alt: "De todas formas, Ayumu se acercará",
        author: "Yamamoto Souichirou",
        cover: "https://github.com/ragnarokscan/ragnarokscan.github.io/blob/main/covers/Soredemo%20Ayumu%20wa%20Yosetekuru.jpg?raw=true",
        genre: ["Comedia", "Romance"],
        description: "El manga relata el día a día de un jugador de shogi amateur y su Senpai, y la forma en la que él tratará de confesarle su amor... ¡Versión serie!",
        status: "En emisión",
        rating: 4.7
    }
];

const chaptersData = [
    // ========== KARAKAI JOUZU NO (MOTO) TAKAGI-SAN (mangaId: 1) ==========
    { 
        id: 314, 
        mangaId: 1, 
        number: 314, 
        title: "Capítulo 314 Final", 
        date: "2024-01-15", 
        pages: 18
    },
    { 
        id: 313, 
        mangaId: 1, 
        number: 313, 
        title: "Capítulo 313", 
        date: "2024-01-14", 
        pages: 18
    },
    { 
        id: 312, 
        mangaId: 1, 
        number: 312, 
        title: "Capítulo 312", 
        date: "2024-01-13", 
        pages: 18
    },
    { 
        id: 311, 
        mangaId: 1, 
        number: 311, 
        title: "Capítulo 311", 
        date: "2024-01-12", 
        pages: 18
    },
    { 
        id: 310, 
        mangaId: 1, 
        number: 310, 
        title: "Capítulo 310", 
        date: "2024-01-11", 
        pages: 18
    },
    
    // ========== SOREDEMO AYUMU WA YOSETEKURU (mangaId: 2) ==========
    { 
        id: 225, 
        mangaId: 2, 
        number: 225, 
        title: "El primer movimiento", 
        date: "2024-02-10", 
        pages: 16
    },
    { 
        id: 224, 
        mangaId: 2, 
        number: 224, 
        title: "La estrategia", 
        date: "2024-02-09", 
        pages: 16
    },
    
    { 
        id: 223, 
        mangaId: 2, 
        number: 223, 
        title: "El torneo", 
        date: "2024-02-08", 
        pages: 16
    }
];

// ============================================
// RESTO DE FUNCIONES (no cambian)
// ============================================

function loadRecentChapters() {
    const recent = [...chaptersData].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    const container = document.getElementById('recentChapters');
    if (container) {
        if (recent.length === 0) {
            container.innerHTML = '<div style="padding: 20px; text-align: center;">Próximamente más capítulos...</div>';
            return;
        }
        
        container.innerHTML = recent.map(ch => `
            <a href="lector.html?manga=${ch.mangaId}&cap=${ch.id}" class="chapter-item">
                <div class="chapter-info">
                    <h4>${getMangaTitle(ch.mangaId)} - Capítulo ${ch.number}: ${ch.title}</h4>
                    <p>${ch.pages} páginas</p>
                </div>
                <div class="chapter-date">${formatDate(ch.date)}</div>
            </a>
        `).join('');
    }
}

function loadPopularMangas() {
    const container = document.getElementById('popularMangas');
    if (container) {
        container.innerHTML = mangasData.map(manga => `
            <a href="manga.html?id=${manga.id}" class="manga-card">
                <img class="manga-cover" src="${manga.cover}" alt="${manga.title}">
                <div class="manga-info">
                    <div class="manga-title">${manga.title}</div>
                    <div class="manga-chapter">${chaptersData.filter(c => c.mangaId === manga.id).length} capítulos</div>
                </div>
            </a>
        `).join('');
    }
}

function loadAllMangas() {
    const container = document.getElementById('allMangas');
    if (container) {
        container.innerHTML = mangasData.map(manga => `
            <a href="manga.html?id=${manga.id}" class="manga-card">
                <img class="manga-cover" src="${manga.cover}" alt="${manga.title}">
                <div class="manga-info">
                    <div class="manga-title">${manga.title}</div>
                    <div class="manga-chapter">${chaptersData.filter(c => c.mangaId === manga.id).length} caps</div>
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
        if (container) {
            container.innerHTML = `
                <div class="manga-detail-grid">
                    <div class="detail-cover-container">
                        <img class="detail-cover" src="${manga.cover}" alt="${manga.title}">
                        <div class="rating">⭐ ${manga.rating}/5</div>
                    </div>
                    <div class="detail-info">
                        <h1>${manga.title}</h1>
                        <h3>${manga.title_alt || ''}</h3>
                        <p class="author">✍️ ${manga.author}</p>
                        <p class="description">${manga.description}</p>
                        <div class="genres">
                            ${manga.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                        </div>
                        <p class="status">📌 Estado: ${manga.status}</p>
                        ${getLatestChapter(manga.id) ? `<a href="lector.html?manga=${manga.id}&cap=${getLatestChapter(manga.id)}" class="btn-continue">📖 Continuar Leyendo</a>` : ''}
                    </div>
                </div>
            `;
        }
    }
}

function loadChaptersList(mangaId) {
    const chapters = chaptersData.filter(c => c.mangaId == mangaId).sort((a,b) => b.number - a.number);
    const container = document.getElementById('chaptersList');
    if (container) {
        if (chapters.length === 0) {
            container.innerHTML = '<div class="no-chapters" style="padding: 30px; text-align: center;">Próximamente más capítulos...</div>';
            return;
        }
        
        container.innerHTML = chapters.map(ch => `
            <a href="lector.html?manga=${mangaId}&cap=${ch.id}" class="chapter-item">
                <div class="chapter-number">Capítulo ${ch.number}</div>
                <div class="chapter-title">${ch.title}</div>
                <div class="chapter-date">${formatDate(ch.date)}</div>
            </a>
        `).join('');
    }
}

function loadReader(mangaId, chapterId) {
    const chapter = chaptersData.find(c => c.id == chapterId);
    const manga = mangasData.find(m => m.id == mangaId);
    
    if (chapter && manga) {
        document.title = `${manga.title} - Capítulo ${chapter.number} | MangaScan`;
        
        const pagesContainer = document.getElementById('pagesContainer');
        let pagesHtml = '';
        
        for (let i = 1; i <= chapter.pages; i++) {
            const pageNum = String(i).padStart(2, '0');
            const imgPath = `chapters/${mangaId}/${chapter.number}/${pageNum}.jpg`;
            pagesHtml += `<img class="manga-page" src="${imgPath}" alt="Página ${i}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x1200/2a2a3e/ff6b6b?text=Pagina+${i}+(Proximamente)'">`;
        }
        
        pagesContainer.innerHTML = pagesHtml;
        
        document.getElementById('readerInfo').innerHTML = `${manga.title} - Capítulo ${chapter.number}: ${chapter.title}`;
        
        // Navegación entre capítulos
        const mangaChapters = chaptersData.filter(c => c.mangaId == mangaId).sort((a,b) => a.number - b.number);
        const currentIndex = mangaChapters.findIndex(c => c.id == chapterId);
        
        const prevBtn = document.getElementById('prevChapter');
        const nextBtn = document.getElementById('nextChapter');
        
        if (currentIndex > 0) {
            const prev = mangaChapters[currentIndex - 1];
            prevBtn.href = `lector.html?manga=${mangaId}&cap=${prev.id}`;
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        } else {
            prevBtn.href = '#';
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        }
        
        if (currentIndex < mangaChapters.length - 1) {
            const next = mangaChapters[currentIndex + 1];
            nextBtn.href = `lector.html?manga=${mangaId}&cap=${next.id}`;
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        } else {
            nextBtn.href = '#';
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        }
    } else {
        document.getElementById('pagesContainer').innerHTML = '<div class="loading">Error: No se encontró el capítulo</div>';
    }
}

function getMangaTitle(mangaId) {
    const manga = mangasData.find(m => m.id === mangaId);
    return manga ? manga.title : 'Desconocido';
}

function getLatestChapter(mangaId) {
    const chapters = chaptersData.filter(c => c.mangaId == mangaId);
    if (chapters.length === 0) return null;
    const latest = chapters.reduce((max, ch) => ch.number > max.number ? ch : max, chapters[0]);
    return latest.id;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

function filterMangasByGenre(genre) {
    const container = document.getElementById('allMangas');
    if (!container) return;
    
    const filtered = genre === 'todos' 
        ? mangasData 
        : mangasData.filter(m => m.genre.includes(genre));
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center;">No se encontraron mangas de este género</div>';
        return;
    }
    
    container.innerHTML = filtered.map(manga => `
        <a href="manga.html?id=${manga.id}" class="manga-card">
            <img class="manga-cover" src="${manga.cover}" alt="${manga.title}">
            <div class="manga-info">
                <div class="manga-title">${manga.title}</div>
                <div class="manga-chapter">${chaptersData.filter(c => c.mangaId === manga.id).length} caps</div>
            </div>
        </a>
    `).join('');
}

function filterMangasBySearch(query) {
    const container = document.getElementById('allMangas');
    if (!container) return;
    
    const filtered = mangasData.filter(m => 
        m.title.toLowerCase().includes(query) || 
        m.title_alt?.toLowerCase().includes(query) ||
        m.author.toLowerCase().includes(query)
    );
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center;">No se encontraron resultados para tu búsqueda</div>';
        return;
    }
    
    container.innerHTML = filtered.map(manga => `
        <a href="manga.html?id=${manga.id}" class="manga-card">
            <img class="manga-cover" src="${manga.cover}" alt="${manga.title}">
            <div class="manga-info">
                <div class="manga-title">${manga.title}</div>
                <div class="manga-chapter">${chaptersData.filter(c => c.mangaId === manga.id).length} caps</div>
            </div>
        </a>
    `).join('');
}
