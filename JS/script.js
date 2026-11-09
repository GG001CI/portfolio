document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENU MOBILE
  // ==========================================
  const boutonMenu = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');

  if (boutonMenu && menu) {
    boutonMenu.addEventListener('click', () => {
      menu.classList.toggle('open');
      boutonMenu.classList.toggle('active');

      const estOuvert = boutonMenu.getAttribute('aria-expanded') === 'true';
      boutonMenu.setAttribute('aria-expanded', !estOuvert);
    });
  }

  // ==========================================
  // 2. LIEN ACTIF AU SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const liensNav = document.querySelectorAll('.nav-menu a');

  function mettreAJourLienActif() {
    const positionScroll = window.scrollY;
    const decalage = 120;

    sections.forEach((section) => {
      const haut = section.offsetTop - decalage;
      const bas = haut + section.offsetHeight;
      const id = section.getAttribute('id');
      const lien = document.querySelector(`.nav-menu a[href="#${id}"]`);

      if (!lien) return;

      if (positionScroll >= haut && positionScroll < bas) {
        lien.classList.add('active');
      } else {
        lien.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', mettreAJourLienActif);
  mettreAJourLienActif();

  // ==========================================
  // 3. SMOOTH SCROLL AVEC OFFSET (header fixe)
  // ==========================================
  document.querySelectorAll('.nav-menu a[href^="#"]').forEach((lien) => {
    lien.addEventListener('click', (e) => {
      e.preventDefault();
      const cibleId = lien.getAttribute('href');
      const section = document.querySelector(cibleId);
      const header = document.querySelector('header');

      if (section && header) {
        const position = section.offsetTop - header.offsetHeight - 16;
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }

      // Fermer le menu mobile après clic
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        boutonMenu.classList.remove('active');
        boutonMenu.setAttribute('aria-expanded', 'false');
      }
    });
  });

});