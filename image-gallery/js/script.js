(function () {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  const closeBtn = lightbox.querySelector('.close');
  const figures = Array.from(gallery.querySelectorAll('figure'));
  let currentIndex = -1;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImg();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxImg() {
    const img = figures[currentIndex].querySelector('img');
    lbImg.src = img.src.replace(/(\/\d+\/)(\d+)$/, '/1200/800');
    lbImg.alt = img.alt;
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + figures.length) % figures.length;
    updateLightboxImg();
  }

  gallery.addEventListener('click', (e) => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    const index = figures.indexOf(fig);
    openLightbox(index);
  });

  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  const filterBtns = document.querySelectorAll('#filters button');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      figures.forEach((fig) => {
        const show = filter === 'all' || fig.dataset.category === filter;
        fig.style.display = show ? 'block' : 'none';
      });
    });
  });

  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = localStorage.getItem('theme') === 'dark';
  if (prefersDark) {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();
