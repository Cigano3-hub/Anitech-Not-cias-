const API_KEY = '9fb3ffa659b84277bc95253c0d0718d3';
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
    imagem: a.urlToImage || "https://via.placeholder.com/600x400",
    url: a.url || "#"
  })));
}

async function loadTechNews() {
  const articles = await fetchNews('smartphone');
  renderNews(articles.map((a, i) => ({
    id: i + 100,
    titulo: a.title,
    descricao: a.description || "Sem descrição",
    categoria: "smartphones",
    imagem: a.urlToImage || "https://via.placeholder.com/600x400",
    url: a.url || "#"
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
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("itemscope", "");
    card.setAttribute("itemtype", "https://schema.org/NewsArticle");

    card.innerHTML = `
      <a href="${noticia.url}" target="_blank" itemprop="url">
        <img src="${noticia.imagem}" alt="${noticia.titulo}" itemprop="image">
      </a>
      <div class="card-content">
        <span class="category-tag" itemprop="genre">${noticia.categoria.charAt(0).toUpperCase() + noticia.categoria.slice(1)}</span>
        <h3 itemprop="headline">${noticia.titulo}</h3>
        <p itemprop="description">${noticia.descricao}</p>
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
    loadAnimeNews();
  }
}

window.onload = function () {
  loadAnimeNews();
};