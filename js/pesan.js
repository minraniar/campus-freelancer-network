// SIDEBAR MOBILE
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}


// DATA PESAN
let messages = [];
let currentFilter = 'semua';


// AMBIL DATA DARI LOCAL STORAGE
function loadMessages() {

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

    renderMessages();
    updateStatistics();
}


// SIMPAN DATA PESAN
function saveMessages() {

    localStorage.setItem(
        'campusContactMessages',
        JSON.stringify(messages)
    );

}


// UPDATE STATISTIK
function updateStatistics() {

    const total = messages.length;

    const belum = messages.filter(
        message => message.dibaca !== true
    ).length;

    const sudah = total - belum;

    document.getElementById('totalPesan').textContent = total;
    document.getElementById('belumDibaca').textContent = belum;
    document.getElementById('sudahDibaca').textContent = sudah;
    document.getElementById('sidebarCount').textContent = belum;

}


// FILTER PESAN
function setFilter(filter) {

    currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.className =
            'filter-btn bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold';
    });

    const activeButton = document.getElementById(
        filter === 'semua'
            ? 'filterSemua'
            : filter === 'belum'
                ? 'filterBelum'
                : 'filterSudah'
    );

    activeButton.className =
        'filter-btn bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold';

    renderMessages();

}


// TAMPILKAN PESAN
function renderMessages() {

    const messageList = document.getElementById('messageList');
    const emptyMessage = document.getElementById('emptyMessage');
    const emptyTitle = document.getElementById('emptyTitle');
    const emptyDescription = document.getElementById('emptyDescription');

    const keyword = document.getElementById('searchMessage').value.toLowerCase();

    messageList.innerHTML = '';

    const filteredMessages = messages.filter(message => {

        const nama = (message.nama || '').toLowerCase();
        const subjek = (message.subjek || '').toLowerCase();
        const email = (message.email || '').toLowerCase();

        const cocokPencarian =
            nama.includes(keyword) ||
            subjek.includes(keyword) ||
            email.includes(keyword);

        const cocokFilter =
            currentFilter === 'semua' ||
            (currentFilter === 'belum' && message.dibaca !== true) ||
            (currentFilter === 'sudah' && message.dibaca === true);

        return cocokPencarian && cocokFilter;

    });


    if (filteredMessages.length === 0) {

        emptyMessage.classList.remove('hidden');

        if (messages.length === 0) {
            emptyTitle.textContent = 'Belum Ada Pesan';
            emptyDescription.textContent =
                'Pesan dari halaman Kontak akan muncul di sini.';
        } else {
            emptyTitle.textContent = 'Pesan Tidak Ditemukan';
            emptyDescription.textContent =
                'Coba ubah kata pencarian atau filter pesan.';
        }

        return;

    }

    emptyMessage.classList.add('hidden');


    filteredMessages.forEach(message => {

        const index = messages.findIndex(
            item => item.id === message.id
        );

        if (index === -1) return;

        const isRead = message.dibaca === true;

        const card = document.createElement('div');

        card.className =
            'message-card border border-slate-200 rounded-xl p-5 ' +
            (isRead ? 'bg-white' : 'bg-blue-50/50');


        // HEADER CARD
        const header = document.createElement('div');

        header.className =
            'flex flex-col sm:flex-row sm:items-start justify-between gap-3';


        const info = document.createElement('div');

        info.className = 'flex items-start gap-3 min-w-0';


        const avatar = document.createElement('div');

        avatar.className =
            'w-11 h-11 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold';

        avatar.textContent =
            (message.nama || '?').trim().charAt(0).toUpperCase();


        const sender = document.createElement('div');

        sender.className = 'min-w-0';


        const name = document.createElement('h3');

        name.className = 'font-bold break-words';
        name.textContent = message.nama || 'Tanpa Nama';


        const email = document.createElement('p');

        email.className = 'text-sm text-slate-500 break-all';
        email.textContent = message.email || '-';


        const date = document.createElement('p');

        date.className = 'text-xs text-slate-400 mt-1';
        date.textContent = message.tanggal || '-';


        sender.append(name, email, date);
        info.append(avatar, sender);


        const badge = document.createElement('span');

        badge.className = isRead
            ? 'text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full shrink-0'
            : 'text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full shrink-0';

        badge.textContent = isRead ? 'Sudah Dibaca' : 'Belum Dibaca';

        header.append(info, badge);


        // SUBJEK DAN PESAN
        const subject = document.createElement('p');

        subject.className = 'font-semibold text-sm mt-4';
        subject.textContent = message.subjek || 'Tanpa Subjek';


        const preview = document.createElement('p');

        preview.className = 'text-sm text-slate-500 mt-2 break-words';
        preview.textContent = message.pesan || 'Tidak ada isi pesan';


        // TOMBOL AKSI
        const actions = document.createElement('div');

        actions.className =
            'flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-200';


        const detailButton = document.createElement('button');

        detailButton.className =
            'px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700';

        detailButton.innerHTML =
            '<i class="fa-solid fa-eye mr-1"></i> Lihat Pesan';

        detailButton.addEventListener('click', () => {
            showDetail(index);
        });


        const readButton = document.createElement('button');

        readButton.className =
            'px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100';

        readButton.innerHTML = isRead
            ? '<i class="fa-solid fa-envelope mr-1"></i> Tandai Belum Dibaca'
            : '<i class="fa-solid fa-check mr-1"></i> Tandai Dibaca';

        readButton.addEventListener('click', () => {
            toggleRead(index);
        });


        const deleteButton = document.createElement('button');

        deleteButton.className =
            'px-4 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100';

        deleteButton.innerHTML =
            '<i class="fa-solid fa-trash mr-1"></i> Hapus';

        deleteButton.addEventListener('click', () => {
            deleteMessage(index);
        });


        actions.append(detailButton, readButton, deleteButton);

        card.append(header, subject, preview, actions);

        messageList.appendChild(card);

    });

}


// LIHAT DETAIL PESAN
function showDetail(index) {

    const message = messages[index];

    if (!message) return;

    document.getElementById('detailNama').textContent =
        message.nama || '-';

    document.getElementById('detailEmail').textContent =
        message.email || '-';

    document.getElementById('detailSubjek').textContent =
        message.subjek || '-';

    document.getElementById('detailTanggal').textContent =
        message.tanggal || '-';

    document.getElementById('detailIsi').textContent =
        message.pesan || '-';


    // OTOMATIS TANDAI SUDAH DIBACA
    if (message.dibaca !== true) {

        messages[index].dibaca = true;

        saveMessages();
        updateStatistics();
        renderMessages();

    }

    const modal = document.getElementById('detailModal');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

}


// TUTUP MODAL
function closeModal() {

    const modal = document.getElementById('detailModal');

    modal.classList.add('hidden');
    modal.classList.remove('flex');

}


// TANDAI SUDAH / BELUM DIBACA
function toggleRead(index) {

    if (!messages[index]) return;

    messages[index].dibaca =
        messages[index].dibaca !== true;

    saveMessages();
    renderMessages();
    updateStatistics();

}


// HAPUS PESAN
function deleteMessage(index) {

    if (!messages[index]) return;

    const confirmation = confirm(
        'Apakah kamu yakin ingin menghapus pesan ini?'
    );

    if (!confirmation) return;

    messages.splice(index, 1);

    saveMessages();
    renderMessages();
    updateStatistics();

}


// TUTUP MODAL JIKA KLIK DI LUAR KOTAK
document.getElementById('detailModal').addEventListener('click', function(event) {

    if (event.target === this) {
        closeModal();
    }

});


// MUAT ULANG PESAN SAAT HALAMAN DIBUKA
loadMessages();


// PERBARUI JIKA DATA BERUBAH DARI TAB BROWSER LAIN
window.addEventListener('storage', function(event) {

    if (event.key === 'campusContactMessages') {
        loadMessages();
    }

});