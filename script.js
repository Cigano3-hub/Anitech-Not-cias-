// Notícias simuladas
const noticias = [
  {
    id: 1,
    titulo: "Novo arco de One Piece começa em 2025",
    descricao: "Eiichiro Oda confirma nova temporada com arco centrado em Wano.",
    categoria: "animes",
    imagem: "https://via.placeholder.com/600x400?text=One+Piece"
  },
  {
    id: 2,
    titulo: "Estreia de Jujutsu Kaisen 3 com recordes",
    descricao: "Filme bate recordes de bilheteria no Japão e chega ao Brasil em breve.",
    categoria: "animes",
    imagem: "https://via.placeholder.com/600x400?text=Jujutsu+Kaisen"
  },
  {
    id: 3,
    titulo: "Novo Galaxy S25 apresenta câmera de 200MP",
    descricao: "Novo modelo da Samsung promete fotos ainda mais nítidas.",
    categoria: "smartphones",
    imagem: "https://via.placeholder.com/600x400?text=Galaxy+S25"
  },
  {
    id: 4,
    titulo: "iPhone 16 pode vir com botão de ação personalizável",
    descricao: "Apple testa nova funcionalidade para personalização do hardware.",
    categoria: "smartphones",
    imagem: "https://via.placeholder.com/600x400?text=iPhone+16"
  },
  {
    id: 5,
    titulo: "Demon Slayer: Kimetsu no Yaiba retorna com nova temporada",
    descricao: "Staff anuncia nova temporada para 2025 com arco do Trem Infinito.",
    categoria: "animes",
    imagem: "https://via.placeholder.com/600x400?text=Demon+Slayer"
  },
  {
    id: 6,
    titulo: "Xiaomi lança smartphone com carregamento sem fio de 120W",
    descricao: "Modelo é prometido para o mercado asiático em breve.",
    categoria: "smartphones",
    imagem: "https://via.placeholder.com/600x400?text=Xiaomi+120W"
  }
];

// Função para renderizar notícias
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

// Filtrar notícias por categoria
function filterNews(categoria) {
  if (categoria === "destaques") {
    renderNews(noticias);
  } else {
    const filtradas = noticias.filter(n => n.categoria === categoria);
    renderNews(filtradas);
  }
}

// Buscar notícias por título
function searchNews() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const filtradas = noticias.filter(n => 
    n.titulo.toLowerCase().includes(input) || 
    n.descricao.toLowerCase().includes(input)
  );
  renderNews(filtradas);
}

// Carregar todas as notícias ao iniciar
window.onload = function () {
  renderNews(noticias);
};
