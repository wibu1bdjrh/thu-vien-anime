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
  data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition";

    card.innerHTML = `
      <div class="relative group cursor-pointer">
        <img src="${anime.image}" alt="${anime.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button class="bg-white text-black px-4 py-1 text-sm font-semibold rounded-full shadow hover:bg-gray-200">Xem ngay</button>
        </div>
      </div>
      <div class="p-3 bg-white rounded-b-lg">
        <h2 class="text-base font-semibold line-clamp-1">${anime.title}</h2>
        <p class="text-sm text-gray-500">${anime.genre} - ${anime.year}</p>
      </div>
    `;

    card.querySelector(".group").addEventListener("click", () => {
      showEpisodeModal(anime);
    });

    container.appendChild(card);
  });
}

function showEpisodeModal(anime) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-xl w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">${anime.title}</h2>
        <button class="text-red-500 font-bold" id="closeModal">✖</button>
      </div>
      <div>
        <select id="episodeSelect" class="w-full mb-4 p-2 rounded border dark:bg-gray-700">
          ${anime.episodes.map((ep, i) => `<option value="${ep.video}">${ep.name}</option>`).join("")}
        </select>
        <iframe id="animeVideo" src="${anime.episodes[0].video}" class="w-full h-64 rounded" allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const select = modal.querySelector("#episodeSelect");
  const iframe = modal.querySelector("#animeVideo");

  select.addEventListener("change", () => {
    iframe.src = select.value;
  });

  modal.querySelector("#closeModal").addEventListener("click", () => {
    modal.remove();
  });
}

renderAnimeList(animeList);

// Lọc thể loại
const genreSelect = document.getElementById("genreSelect");
genreSelect.addEventListener("change", function () {
  const selectedGenre = genreSelect.value.toLowerCase();
  const filtered = animeList.filter(anime =>
    anime.genre.toLowerCase().includes(selectedGenre)
  );
  renderAnimeList(filtered);
});

// Tìm kiếm
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();
  const filtered = animeList.filter(anime =>
    anime.title.toLowerCase().includes(keyword)
  );
  renderAnimeList(filtered);
});
