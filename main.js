// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAym_OSEPFiyJfDB6FcWWmWe3APQE4Ir1M",
  authDomain: "thu-vien-anime.firebaseapp.com",
  projectId: "thu-vien-anime",
  storageBucket: "thu-vien-anime.appspot.com",
  messagingSenderId: "666905146575",
  appId: "1:666905146575:web:f2f77a8a16d1f26ea033ba"
};
firebase.initializeApp(firebaseConfig);

// Chỉ cho phép Hùng đăng nhập
const allowedEmail = "gamesekaij@gmail.com";

// Xử lý đăng nhập
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(() => {
      document.getElementById("loginError").classList.remove("hidden");
    });
});

// Sau khi đăng nhập thành công
firebase.auth().onAuthStateChanged(user => {
  if (user && user.email === allowedEmail) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
    renderAnimeList(animeList);
  }
});

const container = document.getElementById("animeList");
const episodeSelect = document.getElementById("episodeSelect");
const episodeSection = document.getElementById("episodeSection");
const videoPlayer = document.getElementById("videoPlayer");

// Hiển thị danh sách anime
function renderAnimeList(data) {
  container.innerHTML = "";
  data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition";
    card.innerHTML = `
      <div class="relative group cursor-pointer">
        <img src="${anime.image}" alt="${anime.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button class="bg-white text-black px-4 py-1 text-sm font-semibold rounded-full shadow">Xem ngay</button>
        </div>
      </div>
      <div class="p-3 bg-white rounded-b-lg">
        <h2 class="text-base font-semibold line-clamp-1">${anime.title}</h2>
        <p class="text-sm text-gray-500">${anime.genre} - ${anime.year}</p>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      episodeSelect.innerHTML = anime.episodes.map(ep => `<option value="${ep.id}">${ep.name}</option>`).join("");
      loadVideo(anime.episodes[0].id);
      episodeSection.classList.remove("hidden");
    });
    container.appendChild(card);
  });
}

// Chọn tập
episodeSelect.addEventListener("change", function () {
  loadVideo(this.value);
});

// Phát video theo ID
function loadVideo(id) {
  if (id.length === 11) {
    // YouTube ID
    videoPlayer.src = `https://www.youtube.com/embed/${id}`;
  } else {
    // Google Drive ID
    videoPlayer.src = `https://drive.google.com/file/d/${id}/preview`;
  }
}

// Tìm kiếm anime
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = animeList.filter(anime => anime.title.toLowerCase().includes(keyword));
  renderAnimeList(filtered);
});

// Lọc thể loại
document.getElementById("genreSelect").addEventListener("change", function () {
  const genre = this.value.toLowerCase();
  const filtered = genre ? animeList.filter(anime => anime.genre.toLowerCase().includes(genre)) : animeList;
  renderAnimeList(filtered);
});
