// DATA 10 FREELANCER
const services = [

{
id:1, name:"Nadia Amalia", major:"Sistem Informasi",
initials:"NA", color:"bg-purple-100 text-purple-700",
title:"Desain Logo dan Branding Bisnis",
category:"Design",
description:"Membantu membuat logo profesional untuk bisnis, organisasi, dan usaha kecil.",
price:50000, rating:4.9, reviews:24, status:"Tersedia"
},

{
id:2, name:"Ahmad Fauzan", major:"Teknik Informatika",
initials:"AF", color:"bg-blue-100 text-blue-700",
title:"Pembuatan Website Responsif",
category:"Web Development",
description:"Membuat website modern yang responsif untuk berbagai perangkat.",
price:150000, rating:4.8, reviews:18, status:"Tersedia"
},

{
id:3, name:"Salsa Putri", major:"Sistem Informasi",
initials:"SP", color:"bg-orange-100 text-orange-700",
title:"Jasa Penulisan Artikel",
category:"Writing",
description:"Menulis artikel informatif, deskripsi produk, dan konten digital.",
price:35000, rating:4.7, reviews:15, status:"Tersedia"
},

{
id:4, name:"Rizky Pratama", major:"Teknik Informatika",
initials:"RP", color:"bg-green-100 text-green-700",
title:"Video Editing Media Sosial",
category:"Video Editing",
description:"Editing video pendek untuk Instagram, TikTok, dan promosi.",
price:75000, rating:4.9, reviews:31, status:"Tersedia"
},

{
id:5, name:"Dinda Maharani", major:"Desain Komunikasi Visual",
initials:"DM", color:"bg-pink-100 text-pink-700",
title:"Desain Poster dan Feed Instagram",
category:"Design",
description:"Desain visual kreatif untuk promosi acara dan produk.",
price:45000, rating:4.8, reviews:20, status:"Tersedia"
},

{
id:6, name:"Fajar Ramadhan", major:"Teknik Informatika",
initials:"FR", color:"bg-indigo-100 text-indigo-700",
title:"Pembuatan Database MySQL",
category:"Programming",
description:"Merancang database dan query SQL untuk kebutuhan proyek.",
price:85000, rating:4.6, reviews:12, status:"Tersedia"
},

{
id:7, name:"Aulia Safitri", major:"Ilmu Komunikasi",
initials:"AS", color:"bg-yellow-100 text-yellow-700",
title:"Copywriting Konten Promosi",
category:"Writing",
description:"Membuat teks promosi yang menarik untuk produk dan layanan.",
price:40000, rating:4.9, reviews:27, status:"Tersedia"
},

{
id:8, name:"Kevin Saputra", major:"Teknik Informatika",
initials:"KS", color:"bg-cyan-100 text-cyan-700",
title:"Editing Video Presentasi",
category:"Video Editing",
description:"Mengedit video presentasi dan tugas multimedia.",
price:60000, rating:4.7, reviews:14, status:"Tersedia"
},

{
id:9, name:"Putra Aditya", major:"Sistem Informasi",
initials:"PA", color:"bg-blue-100 text-blue-700",
title:"Pembuatan Website Portofolio",
category:"Web Development",
description:"Membuat website portofolio pribadi dengan desain modern.",
price:150000, rating:4.9, reviews:16, status:"Tersedia"
},

{
id:10, name:"Dimas Prakoso", major:"Teknik Informatika",
initials:"DP", color:"bg-indigo-100 text-indigo-700",
title:"Jasa Coding HTML, CSS dan JavaScript",
category:"Programming",
description:"Membantu pengembangan fitur website dan pemrograman frontend.",
price:90000, rating:4.8, reviews:19, status:"Tersedia"
}

];

// STATE
let selectedCategory = "Semua";
let searchKeyword = "";
let favorites = JSON.parse(localStorage.getItem("cfFavorites") || "[]");

// FORMAT RUPIAH
function formatPrice(price) {
    return "Rp" + price.toLocaleString("id-ID");
}

// RENDER CARD
function renderServices(data) {

    const container = document.getElementById("serviceList");
    const empty = document.getElementById("emptyState");

    container.innerHTML = "";

    document.getElementById("resultCount").textContent =
        "Menampilkan " + data.length + " dari " + services.length + " layanan";

    if(data.length === 0) {
        empty.classList.remove("hidden");
        return;
    }

    empty.classList.add("hidden");

    data.forEach(service => {

        const isFavorite = favorites.includes(service.id);

        const card = document.createElement("div");

        card.className = "service-card bg-white rounded-2xl border border-slate-100 overflow-hidden";

        card.innerHTML = `

        <div class="p-5">

            <div class="flex justify-between items-start mb-4">

                <div class="w-12 h-12 ${service.color} rounded-xl flex items-center justify-center font-bold">
                    ${service.initials}
                </div>

                <button onclick="toggleFavorite(${service.id})"
                class="favorite ${isFavorite ? 'active' : 'text-slate-400'} hover:text-red-500 text-lg"
                aria-label="Favorit">

                    <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart"></i>

                </button>

            </div>

            <div class="mb-4">
                <span class="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    ${service.category}
                </span>
            </div>

            <h3 class="font-bold text-slate-800 leading-snug min-h-[48px]">
                ${service.title}
            </h3>

            <p class="text-xs text-slate-500 mt-2 leading-relaxed min-h-[40px]">
                ${service.description}
            </p>

            <div class="flex items-center justify-between mt-4">

                <div class="flex items-center gap-2">

                    <div class="w-8 h-8 ${service.color} rounded-full flex items-center justify-center text-xs font-bold">
                        ${service.initials}
                    </div>

                    <div>
                        <p class="text-xs font-semibold">${service.name}</p>
                        <p class="text-xs text-slate-400">${service.major}</p>
                    </div>

                </div>

                <div class="text-xs text-orange-500 font-semibold">
                    <i class="fa-solid fa-star"></i> ${service.rating}
                </div>

            </div>

            <div class="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between">

                <div>
                    <p class="text-xs text-slate-400">Harga mulai</p>
                    <p class="text-base font-extrabold text-blue-600">
                        ${formatPrice(service.price)}
                    </p>
                </div>

                <button onclick="openDetail(${service.id})"
                class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-3 rounded-xl">
                    Lihat Detail
                    <i class="fa-solid fa-arrow-right ml-1"></i>
                </button>

            </div>

        </div>
        `;

        container.appendChild(card);

    });
}

// SEARCH FORM
document.getElementById("searchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    searchKeyword = document.getElementById("searchInput").value.trim().toLowerCase();

    applyFilters();

});

// FILTER AND SORT
function applyFilters() {

    const sort = document.getElementById("sortSelect").value;

    let result = services.filter(service => {

        const searchableText = [
            service.name,
            service.title,
            service.category,
            service.major,
            service.description
        ].join(" ").toLowerCase();

        const matchKeyword = searchableText.includes(searchKeyword);

        const matchCategory =
            selectedCategory === "Semua" ||
            service.category === selectedCategory;

        return matchKeyword && matchCategory;

    });

    if(sort === "low") {
        result.sort((a,b) => a.price - b.price);
    }

    else if(sort === "high") {
        result.sort((a,b) => b.price - a.price);
    }

    else if(sort === "rating") {
        result.sort((a,b) => b.rating - a.rating);
    }

    renderServices(result);
}

// CATEGORY
function setCategory(category, button) {

    selectedCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {

        btn.classList.remove("bg-blue-600","text-white");
        btn.classList.add("bg-white","border","border-slate-200");

    });

    button.classList.remove("bg-white","border","border-slate-200");
    button.classList.add("bg-blue-600","text-white");

    applyFilters();
}

// FAVORITE
function toggleFavorite(id) {

    if(favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("cfFavorites", JSON.stringify(favorites));

    applyFilters();
}

// DETAIL
function openDetail(id) {

    const service = services.find(item => item.id === id);

    if(!service) return;

    sessionStorage.setItem("selectedService", JSON.stringify(service));

    window.location.href = "detail.html";
}

// RESET
function resetFilter() {

    searchKeyword = "";
    selectedCategory = "Semua";

    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "default";

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("bg-blue-600","text-white");
        btn.classList.add("bg-white","border","border-slate-200");
    });

    const firstButton = document.querySelector(".category-btn");

    firstButton.classList.remove("bg-white","border","border-slate-200");
    firstButton.classList.add("bg-blue-600","text-white");

    applyFilters();
}

// SIDEBAR MOBILE
function toggleSidebar() {

    document.getElementById("sidebar").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("hidden");

}

// INITIAL
renderServices(services);