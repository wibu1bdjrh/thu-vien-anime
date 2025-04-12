// ✅ Danh sách anime giả lập (với nhiều tập mỗi anime)
const animeList = [
  {
    title: "Grand blue",
    genre: "Hài hước, tình cảm",
    year: 2020,
    image: "https://i.imgur.com/WdNeyg0.jpeg",
    episodes: [
      { name: "Tập 1", videoId: "1TFM3VCKHLpuD8zBHiAVucn7LpMNARbNh" },
      { name: "Tập 2", videoId: "1TABCDEFHIJKLmnO0aBCDEF123456789" }
    ]
  },
  {
    title: "Your Name",
    genre: "Lãng mạn",
    year: 2016,
    image: "https://i.imgur.com/oHgkI4h.jpg",
    episodes: [
      { name: "Full Movie", videoId: "3KR8_igDs1Y" }
    ]
  },
  {
    title: "Attack on Titan",
    genre: "Kịch tính",
    year: 2013,
    image: "https://i.imgur.com/tbn61U6.jpg",
    episodes: [
      { name: "Tập 1", videoId: "MGRm4IzK1SQ" },
      { name: "Tập 2", videoId: "MGRm4IzK1SQ" }
    ]
  }
];

// ✅ Render danh sách anime
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

    // ✅ Khi click "Xem ngay"
    card.querySelector(".group").addEventListener("click", () => {
      const modal = document.getElementById("videoModal");
      const videoPlayer = document.getElementById("videoPlayer");
      const episodeSelect = document.getElementById("episodeSelect");
      const modalTitle = document.getElementById("modalTitle");

      modal.classList.remove("hidden");
      modalTitle.textContent = `Đang xem: ${anime.title}`;

      // Gán danh sách tập
      episodeSelect.innerHTML = "";
      anime.episodes.forEach(ep => {
        const option = document.createElement("option");
        option.value = ep.videoId;
        option.textContent = ep.name;
        episodeSelect.appendChild(option);
      });

      // Tự động phát tập đầu tiên
      videoPlayer.src = `https://drive.google.com/file/d/${anime.episodes[0].videoId}/preview`;
    });

    container.appendChild(card);
  });
}

renderAnimeList(animeList);

// ✅ Lọc theo thể loại
const genreSelect = document.getElementById("genreSelect");
genreSelect.addEventListener("change", function () {
  const selectedGenre = genreSelect.value.toLowerCase();
  const filtered = animeList.filter(anime =>
    anime.genre.toLowerCase().includes(selectedGenre)
  );
  renderAnimeList(filtered);
});

// ✅ Tìm kiếm theo tên
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();
  const filtered = animeList.filter(anime =>
    anime.title.toLowerCase().includes(keyword)
  );
  renderAnimeList(filtered);
});

// ✅ Chọn tập từ dropdown
document.getElementById("episodeSelect").addEventListener("change", function () {
  const videoId = this.value;
  document.getElementById("videoPlayer").src = `https://drive.google.com/file/d/${videoId}/preview`;
});

// ✅ Đóng modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("videoModal").classList.add("hidden");
  document.getElementById("videoPlayer").src = "";
});
