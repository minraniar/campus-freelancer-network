// SIDEBAR MOBILE
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// FUNGSI MENYIMPAN PESAN
document.getElementById('contactForm').addEventListener('submit', function(event) {

    event.preventDefault();

    // AMBIL DATA FORMULIR
    const message = {
        id: Date.now(),
        nama: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        subjek: document.getElementById('contactSubject').value,
        pesan: document.getElementById('contactMessage').value.trim(),
        tanggal: new Date().toLocaleString('id-ID')
    };

    // VALIDASI
    if (!message.nama || !message.email || !message.subjek || !message.pesan) {
        alert('Mohon lengkapi semua kolom.');
        return;
    }

    // AMBIL PESAN YANG SUDAH TERSIMPAN
    let messages = [];

    try {
        messages = JSON.parse(
            localStorage.getItem('campusContactMessages') || '[]'
        );

        if (!Array.isArray(messages)) {
            messages = [];
        }

    } catch (error) {
        messages = [];
    }

    // SIMPAN PESAN BARU
    messages.push(message);

    localStorage.setItem(
        'campusContactMessages',
        JSON.stringify(messages)
    );

    // TAMPILKAN NOTIFIKASI BERHASIL
    document.getElementById('successMessage').classList.remove('hidden');

    // KOSONGKAN FORMULIR
    document.getElementById('contactForm').reset();

    // ARAHKAN KE NOTIFIKASI
    document.getElementById('successMessage').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

});