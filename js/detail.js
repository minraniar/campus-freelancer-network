// MOBILE SIDEBAR
        function toggleSidebar() {

            document.getElementById('sidebar').classList.toggle('show');

            document.getElementById('overlay').classList.toggle('hidden');

        }


        // DATA FREELANCER TERPILIH
        let selectedService = null;


        // FORMAT RUPIAH
        function formatRupiah(angka) {

            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }).format(Number(angka) || 0);

        }


        // MEMUAT DETAIL LAYANAN
        function loadDetail() {

            const savedService = sessionStorage.getItem("selectedService");

            const detailContent = document.getElementById("detailContent");

            const emptyDetail = document.getElementById("emptyDetail");


            if (!savedService) {

                emptyDetail.classList.remove("hidden");

                return;

            }


            try {

                selectedService = JSON.parse(savedService);


                if (!selectedService || !selectedService.id) {

                    throw new Error("Data freelancer tidak valid");

                }


                // NAMA FREELANCER
                document.getElementById("nama").textContent =
                    selectedService.name || "-";


                // AVATAR
                document.getElementById("avatar").textContent =
                    selectedService.initials || "?";


                // LAYANAN
                document.getElementById("layanan").textContent =
                    selectedService.title || "-";


                // KATEGORI
                document.getElementById("kategori").textContent =
                    selectedService.category || "-";

                document.getElementById("kategoriInfo").textContent =
                    selectedService.category || "-";


                // PROGRAM STUDI
                document.getElementById("jurusan").textContent =
                    selectedService.major || "-";


                // HARGA
                document.getElementById("harga").textContent =
                    formatRupiah(selectedService.price);


                // RATING
                document.getElementById("rating").textContent =
                    "★ " + (selectedService.rating || "Belum ada rating");


                // ULASAN
                document.getElementById("ulasan").textContent =
                    (selectedService.reviews ?? 0) + " ulasan";


                // STATUS
                const status = document.getElementById("status");

                status.textContent =
                    selectedService.status || "Status belum tersedia";


                if (selectedService.status === "Tersedia") {

                    status.className =
                        "inline-block px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700";

                } else {

                    status.className =
                        "inline-block px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 text-slate-600";

                }


                // DESKRIPSI
                document.getElementById("deskripsi").textContent =
                    selectedService.description || "Belum ada deskripsi layanan.";


                // TAMPILKAN DETAIL
                detailContent.classList.remove("hidden");


            } catch (error) {

                console.error("Gagal memuat detail:", error);

                selectedService = null;

                emptyDetail.classList.remove("hidden");

            }

        }


        // HUBUNGI FREELANCER
        function hubungiFreelancer() {

            if (!selectedService) {

                alert("Data freelancer tidak tersedia.");

                return;

            }


            sessionStorage.setItem(
                "contactTarget",
                JSON.stringify(selectedService)
            );


            window.location.href = "kontak.html";

        }


        // JALANKAN SAAT HALAMAN DIBUKA
        loadDetail();