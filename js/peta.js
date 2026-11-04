// SIDEBAR MOBILE
function toggleSidebar() {

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');

}


// DATA 10 FREELANCER
// Nama, jasa, kategori, dan harga disamakan dengan freelance.html.
// Koordinat merupakan lokasi simulasi untuk demonstrasi.

const freelancers = [

    {
        id: 1,
        name: "Nadia Amalia",
        service: "Desain Logo dan Branding Bisnis",
        category: "Design",
        price: 50000,
        location: "Dago",
        lat: -6.8830,
        lng: 107.6150
    },

    {
        id: 2,
        name: "Ahmad Fauzan",
        service: "Pembuatan Website Responsif",
        category: "Web Development",
        price: 150000,
        location: "Cihampelas",
        lat: -6.8950,
        lng: 107.6040
    },

    {
        id: 3,
        name: "Salsa Putri",
        service: "Jasa Penulisan Artikel",
        category: "Writing",
        price: 35000,
        location: "Buah Batu",
        lat: -6.9470,
        lng: 107.6320
    },

    {
        id: 4,
        name: "Rizky Pratama",
        service: "Video Editing Media Sosial",
        category: "Video Editing",
        price: 75000,
        location: "Antapani",
        lat: -6.9140,
        lng: 107.6600
    },

    {
        id: 5,
        name: "Dinda Maharani",
        service: "Desain Poster dan Feed Instagram",
        category: "Design",
        price: 45000,
        location: "Setiabudi",
        lat: -6.8640,
        lng: 107.5940
    },

    {
        id: 6,
        name: "Fajar Ramadhan",
        service: "Pembuatan Database MySQL",
        category: "Programming",
        price: 85000,
        location: "Cibiru",
        lat: -6.9350,
        lng: 107.7180
    },

    {
        id: 7,
        name: "Aulia Safitri",
        service: "Copywriting Konten Promosi",
        category: "Writing",
        price: 40000,
        location: "Lengkong",
        lat: -6.9280,
        lng: 107.6170
    },

    {
        id: 8,
        name: "Kevin Saputra",
        service: "Editing Video Presentasi",
        category: "Video Editing",
        price: 60000,
        location: "Kiaracondong",
        lat: -6.9250,
        lng: 107.6460
    },

    {
        id: 9,
        name: "Putra Aditya",
        service: "Pembuatan Website Portofolio",
        category: "Web Development",
        price: 150000,
        location: "Cicendo",
        lat: -6.9030,
        lng: 107.5900
    },

    {
        id: 10,
        name: "Dimas Prakoso",
        service: "Jasa Coding HTML, CSS dan JavaScript",
        category: "Programming",
        price: 90000,
        location: "Coblong",
        lat: -6.8910,
        lng: 107.6100
    }

];


// MEMBUAT PETA
const map = L.map("map").setView([-6.9147, 107.6098], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// GROUP PENANDA
const markerGroup = L.featureGroup().addTo(map);


// FORMAT RUPIAH
function formatRupiah(number) {
    return "Rp" + number.toLocaleString("id-ID");
}


// MEMBUAT POPUP
function createPopup(item) {

    const wrapper = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = item.name;

    const service = document.createElement("p");
    service.textContent = item.service;

    const category = document.createElement("p");
    category.textContent = "Kategori: " + item.category;

    const location = document.createElement("p");
    location.textContent = "Lokasi: " + item.location;

    const price = document.createElement("strong");
    price.textContent = formatRupiah(item.price);

    wrapper.append(name, service, category, location, price);

    return wrapper;
}


// MENAMPILKAN MARKER
function showMarkers(data) {

    markerGroup.clearLayers();

    data.forEach(item => {

        const marker = L.marker([item.lat, item.lng]);

        marker.bindPopup(createPopup(item));

        marker.addTo(markerGroup);

    });

    if (data.length > 0) {

        map.fitBounds(markerGroup.getBounds(), {
            padding: [35, 35],
            maxZoom: 14
        });

    } else {

        map.setView([-6.9147, 107.6098], 12);

    }

}


// MENAMPILKAN DAFTAR
function showList(data) {

    const list = document.getElementById("freelancerList");
    const empty = document.getElementById("emptyMessage");

    list.innerHTML = "";

    if (data.length === 0) {

        empty.classList.remove("hidden");
        return;

    }

    empty.classList.add("hidden");

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "freelancer-item";

        const header = document.createElement("div");
        header.className = "flex items-center gap-3";

        const avatar = document.createElement("div");

        avatar.className =
            "w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0";

        avatar.textContent = item.name.charAt(0);

        const info = document.createElement("div");
        info.className = "min-w-0";

        const name = document.createElement("h4");

        name.className = "font-semibold text-sm text-slate-800";
        name.textContent = item.name;

        const category = document.createElement("p");

        category.className = "text-xs text-slate-500 mt-1";
        category.textContent = item.category;

        info.append(name, category);
        header.append(avatar, info);

        const service = document.createElement("p");

        service.className = "text-xs text-slate-500 mt-3";
        service.textContent = item.service;

        const footer = document.createElement("div");

        footer.className =
            "flex justify-between items-center mt-3 pt-3 border-t";

        const location = document.createElement("span");

        location.className = "text-xs text-slate-500";
        location.textContent = "📍 " + item.location;

        const price = document.createElement("span");

        price.className = "text-xs font-bold text-blue-600";
        price.textContent = formatRupiah(item.price);

        footer.append(location, price);

        card.append(header, service, footer);

        // KLIK DAFTAR UNTUK MENUJU LOKASI
        card.addEventListener("click", () => {

            map.flyTo([item.lat, item.lng], 16, {
                duration: 1
            });

            markerGroup.eachLayer(marker => {

                const position = marker.getLatLng();

                if (
                    position.lat === item.lat &&
                    position.lng === item.lng
                ) {
                    marker.openPopup();
                }

            });

        });

        list.appendChild(card);

    });

}


// FILTER DATA
function filterData() {

    const keyword = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const category = document.getElementById("categoryFilter").value;

    const filtered = freelancers.filter(item => {

        const matchSearch =
            item.name.toLowerCase().includes(keyword) ||
            item.service.toLowerCase().includes(keyword) ||
            item.location.toLowerCase().includes(keyword);

        const matchCategory =
            category === "Semua" ||
            item.category === category;

        return matchSearch && matchCategory;

    });

    updateDashboard(filtered);

}


// UPDATE HALAMAN
function updateDashboard(data) {

    const categories = [
        ...new Set(data.map(item => item.category))
    ];

    const locations = [
        ...new Set(data.map(item => item.location))
    ];

    document.getElementById("totalFreelancer").textContent =
        data.length;

    document.getElementById("totalLocations").textContent =
        locations.length;

    document.getElementById("totalCategories").textContent =
        categories.length;

    document.getElementById("resultCount").textContent =
        data.length;

    showMarkers(data);
    showList(data);

}


// EVENT FILTER
document.getElementById("searchInput")
    .addEventListener("input", filterData);

document.getElementById("categoryFilter")
    .addEventListener("change", filterData);


// RESET FILTER
function resetFilter() {

    document.getElementById("searchInput").value = "";
    document.getElementById("categoryFilter").value = "Semua";

    updateDashboard(freelancers);

    map.setView([-6.9147, 107.6098], 12);

}


// TAMPILKAN DATA PERTAMA
updateDashboard(freelancers);


// PERBAIKI UKURAN PETA
setTimeout(() => {
    map.invalidateSize();
}, 300);

window.addEventListener("resize", () => {
    map.invalidateSize();
});