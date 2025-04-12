// ✅ Danh sách anime với nhiều tập
const animeList = [
  {
    title: "Grand blue",
    genre: "Hài hước, tình cảm, học đường, đời thường",
    year: 2020,
    image: "https://i.imgur.com/WdNeyg0.jpeg",
    episodes: [
      { name: "Tập 1", video: "https://drive.google.com/file/d/1TFM3VCKHLpuD8zBHiAVucn7LpMNARbNh/preview" },
      { name: "Tập 2", video: "https://drive.google.com/file/d/1r6nXwAvWzFYHfKHTK2OqMTMRvPYfi5ut/preview" },
      { name: "Tập 3", video: "https://drive.google.com/file/d/1WQlSDhAt-f7LAF4yzqN2zZyKQmW9cM7L/preview" }
    ]
  },
  {
    title: "Your Name",
    genre: "Lãng mạn",
    year: 2016,
    image: "https://i.imgur.com/oHgkI4h.jpg",
    episodes: [
      { name: "Full", video: "https://www.youtube.com/embed/3KR8_igDs1Y" }
    ]
  },
  {
    title: "Attack on Titan",
    genre: "Kịch tính",
    year: 2013,
    image: "https://i.imgur.com/tbn61U6.jpg",
    episodes: [
      { name: "Trailer", video: "https://www.youtube.com/embed/MGRm4IzK1SQ" }
    ]
  }
];

const container = document.getElementById("animeList");

function renderAnimeList(data) {
  container.innerHTML = "";
  data.forEach((anime, index) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition";

    card.innerHTML = `
      <div class="relative group cursor-pointer">
        <img src="${anime.image}" alt="${anime.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href="anime.html?id=${index}" class="bg-white text-black px-4 py-1 text-sm font-semibold rounded-full shadow hover:bg-gray-200">Xem ngay</a>
        </div>
      </div>
      <div class="p-3 bg-white rounded-b-lg">
        <h2 class="text-base font-semibold line-clamp-1">${anime.title}</h2>
        <p class="text-sm text-gray-500">${anime.genre} - ${anime.year}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

renderAnimeList(animeList);

// Lọc thể loại
const genreSelect = document.getElementById("genreSelect");
if (genreSelect) {
  genreSelect.addEventListener("change", function () {
    const selectedGenre = genreSelect.value.toLowerCase();
    const filtered = animeList.filter(anime =>
      anime.genre.toLowerCase().includes(selectedGenre)
    );
    renderAnimeList(filtered);
  });
}

// Tìm kiếm
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase();
    const filtered = animeList.filter(anime =>
      anime.title.toLowerCase().includes(keyword)
    );
    renderAnimeList(filtered);
  });
}

// Cho phép sử dụng dữ liệu bên ngoài
window.animeList = animeList;
