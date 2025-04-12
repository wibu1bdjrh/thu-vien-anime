// Lấy ID từ URL
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

// Lấy dữ liệu từ window.animeList (được truyền từ main.js)
const anime = window.animeList?.[animeId];

if (!anime) {
  document.getElementById("animeDetail").innerHTML = "<p class='text-red-500'>Không tìm thấy Anime.</p>";
} else {
  const container = document.getElementById("animeDetail");

  // Tạo HTML chi tiết
  container.innerHTML = `
    <div class="flex flex-col md:flex-row gap-4">
      <img src="${anime.image}" alt="${anime.title}" class="w-full md:w-64 rounded-lg object-cover shadow">
      <div class="flex-1">
        <h1 class="text-2xl font-bold mb-2">${anime.title}</h1>
        <p class="mb-2"><strong>Thể loại:</strong> ${anime.genre}</p>
        <p class="mb-2"><strong>Năm:</strong> ${anime.year}</p>
        <p class="mb-4 text-gray-700">${anime.description || "Không có mô tả chi tiết."}</p>
        <div>
          <label for="episodeSelect" class="block font-medium mb-1">Chọn tập:</label>
          <select id="episodeSelect" class="w-full p-2 rounded border mb-4">
            ${anime.episodes.map((ep, i) => `<option value="${ep.video}">${ep.name}</option>`).join("")}
          </select>
          <iframe id="animePlayer" class="w-full h-64 rounded-lg" src="${anime.episodes[0].video}" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;

  // Khi chọn tập khác
  const select = document.getElementById("episodeSelect");
  const player = document.getElementById("animePlayer");
  select.addEventListener("change", () => {
    player.src = select.value;
  });
}
