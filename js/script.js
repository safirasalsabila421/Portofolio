document.addEventListener('DOMContentLoaded', () => {

    // 1. INISIALISASI ANIMATE ON SCROLL (AOS)
    AOS.init({
        duration: 800, // Durasi animasi dalam milidetik
        once: true,    // Animasi hanya berjalan sekali saat scroll ke bawah
        easing: 'ease-in-out',
        offset: 100,   // Jarak trigger animasi dari bawah layar
    });

    // 2. EFEK SCROLL PADA HEADER
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. PENGAMAT UNTUK NAVIGASI BAWAH
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-item'); // Hanya menargetkan navigasi bawah
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-item[href*="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach(section => navObserver.observe(section));

    // =========================================================================
    // // 3. LOGIC UNTUK TOMBOL 'SCROLL TO TOP' & PROGRESS BAR
    // // =========================================================================
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const progressBar = document.querySelector('.scroll-to-top .progress-bar');
    if (scrollToTopBtn && progressBar) {
            window.addEventListener('scroll', () => {
        // Tampilkan/sembunyikan tombol
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Hitung persentase scroll
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        // Update tinggi progress bar
        progressBar.style.height = scrollPercentage + '%';
        });
    }

    // 5. LOGIC UNTUK TABS PADA BAGIAN RESUME
    const tabs = document.querySelectorAll('.tab-button');
    const all_content = document.querySelectorAll('.resume-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            all_content.forEach(content => content.classList.remove('active'));
            const target = document.querySelector(tab.dataset.target);
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // 6. LOGIC UNTUK MODAL/LIGHTBOX SERTIFIKAT
    const certificateItems = document.querySelectorAll('.certificate-item');
    const certificateModal = document.querySelector('.certificate-modal');
    if (certificateModal) {
        const certificateModalImg = document.getElementById('modal-img-id');
        const closeCertificateModalBtn = certificateModal.querySelector('.modal-close');
        
        certificateItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                certificateModalImg.src = imgSrc;
                certificateModal.classList.add('active');
            });
        });

        const closeCertificateModal = () => certificateModal.classList.remove('active');
        if(closeCertificateModalBtn) {
            closeCertificateModalBtn.addEventListener('click', closeCertificateModal);
        }
        certificateModal.addEventListener('click', e => {
            if (e.target === certificateModal) closeCertificateModal();
        });
    }

    // 7. LOGIC UNTUK TOMBOL "SHOW MORE" SERTIFIKAT
    const showMoreBtn = document.getElementById('show-more-btn');
    const certificatesGallery = document.getElementById('certificates-gallery');
    if (showMoreBtn && certificatesGallery) {
        showMoreBtn.addEventListener('click', () => {
            certificatesGallery.classList.toggle('show-all');
            showMoreBtn.textContent = certificatesGallery.classList.contains('show-all') ? 'Show Less' : 'Show More';
        });
    }

    // 8. LOGIC UNTUK SERVICE MODAL
    const serviceCards = document.querySelectorAll('[data-modal-target]');
    const serviceModals = document.querySelectorAll('.service-modal');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetModal = document.getElementById(card.dataset.modalTarget);
            if (targetModal) targetModal.classList.add('active');
        });
    });
    serviceModals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        }
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    // 9. LOGIC UNTUK THEME SWITCHER (TERANG/GELAP)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if(themeToggle){
        const updateIcon = () => {
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        };

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light-theme') {
            body.classList.add('light-theme');
        }
        updateIcon();

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light-theme');
            } else {
                localStorage.removeItem('theme');
            }
            updateIcon();
        });
    }
});