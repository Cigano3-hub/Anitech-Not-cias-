const API_KEY = '95e4b0adafc24c5f88a45b9f788fdd93';
const BASE_URL = 'https://newsapi.org/v2/everything';

async function fetchNews(query) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${query}&sortBy=popularity&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}

async function loadAnimeNews() {
  const articles = await fetchNews('anime');
  renderNews(articles.map((a, i) => ({
    id: i,
    titulo: a.title,
    descricao: a.description || "Sem descrição",
    categoria: "animes",
    imagem: a.urlToImage || "https://via.placeholder.com/600x400"
  })));
}

async function loadTechNews() {
  const articles = await fetchNews('smartphone');
  renderNews(articles.map((a, i) => ({
    id: i + 100,
    titulo: a.title,
    descricao: a.description || "Sem descrição",
    categoria: "smartphones",
    imagem: a.urlToImage || "https://via.placeholder.com/600x400"
  })));
}

function renderNews(newsList) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  if (newsList.length === 0) {
    container.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
    return;
  }

  const grid = document.createElement("div");
  grid.className = "news-grid";

  newsList.forEach(noticia => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${noticia.imagem}" alt="${noticia.titulo}">
      <div class="card-content">
        <span class="category-tag">${noticia.categoria.charAt(0).toUpperCase() + noticia.categoria.slice(1)}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descricao}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function filterNews(categoria) {
  if (categoria === "animes") {
    loadAnimeNews();
  } else if (categoria === "smartphones") {
    loadTechNews();
  } else {
    // Carregar todas as notícias
    loadAnimeNews();
  }
}

window.onload = function () {
  loadAnimeNews(); // Carregar notícias de anime por padrão
};
