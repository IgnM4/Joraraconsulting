document.addEventListener('DOMContentLoaded', () => {
  // --- Menú móvil ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && e.target !== navToggle) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Teclado accesible (Tab, Escape)
    navToggle.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // --- Scroll suave en navegación interna ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Slider de Testimonios (con teclado accesible) ---
  const testimonialSlider = document.getElementById('slider');
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.slide');
    let slideIdx = 0;
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    function showSlide(idx) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    }
    if (slides.length && nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        slideIdx = (slideIdx + 1) % slides.length;
        showSlide(slideIdx);
      });
      prevBtn.addEventListener('click', () => {
        slideIdx = (slideIdx - 1 + slides.length) % slides.length;
        showSlide(slideIdx);
      });
      document.addEventListener('keydown', e => {
        if (document.activeElement.tagName === 'BODY') {
          if (e.key === 'ArrowRight') nextBtn.click();
          if (e.key === 'ArrowLeft') prevBtn.click();
        }
      });
      showSlide(slideIdx);
    }
  }

  // --- Slider de videos ---
  const videoSlider = document.getElementById('video-slider');
  if (videoSlider) {
    const videoSlides = videoSlider.querySelectorAll('.video-slide');
    let videoIdx = 0;
    const videoNext = document.getElementById('video-next');
    const videoPrev = document.getElementById('video-prev');
    function showVideo(idx) {
      videoSlides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    }
    if (videoSlides.length && videoNext && videoPrev) {
      videoNext.addEventListener('click', () => {
        videoIdx = (videoIdx + 1) % videoSlides.length;
        showVideo(videoIdx);
      });
      videoPrev.addEventListener('click', () => {
        videoIdx = (videoIdx - 1 + videoSlides.length) % videoSlides.length;
        showVideo(videoIdx);
      });
      showVideo(videoIdx);
    }
  }

  // --- Animación fade-in inicial en cards (sólo si están visibles) ---
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => el.style.opacity = 1, 250 + i * 250);
    }
  });

  // --- Scroll Reveal Animaciones (solo una vez por elemento) ---
  const animEls = document.querySelectorAll('.scroll-anim');
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.93;
    animEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger && !el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);
  revealOnScroll();

  // --- Hero Background Slider (pausa en hover/tap para mejor UX) ---
  const bgImgs = document.querySelectorAll('.hero-bg-img');
  let heroIdx = 0, heroInterval = null;
  const heroSection = document.querySelector('.hero');
  function startHeroSlider() {
    if (bgImgs.length > 1) {
      heroInterval = setInterval(() => {
        bgImgs[heroIdx].classList.remove('active');
        heroIdx = (heroIdx + 1) % bgImgs.length;
        bgImgs[heroIdx].classList.add('active');
      }, 5200);
    }
  }
  function stopHeroSlider() {
    if (heroInterval) clearInterval(heroInterval);
  }
  if (heroSection && bgImgs.length > 1) {
    heroSection.addEventListener('mouseenter', stopHeroSlider);
    heroSection.addEventListener('mouseleave', startHeroSlider);
    heroSection.addEventListener('touchstart', stopHeroSlider);
    heroSection.addEventListener('touchend', startHeroSlider);
    startHeroSlider();
  }

  // --- Cargar publicaciones de LinkedIn ---
  const feedContainer = document.getElementById('linkedin-feed');
  if (feedContainer) {
    fetch('/api/linkedin')
      .then(res => res.json())
      .then(data => {
        if (!data.posts || !data.posts.length) {
          feedContainer.innerHTML = '<p>No hay publicaciones disponibles.</p>';
          return;
        }
        data.posts.forEach(post => {
          const article = document.createElement('article');
          article.className = 'card';
          article.innerHTML = `
            <h4>${post.title}</h4>
            <span class="blog-fecha">${post.date}</span>
            <p>${post.summary}</p>
          `;
          feedContainer.appendChild(article);
        });
      })
      .catch(() => {
        feedContainer.innerHTML = '<p>No se pudo cargar el feed de LinkedIn.</p>';
      });
  }

  // --- Formulario de contacto (validación y AJAX) ---
  const form = document.getElementById('form-contacto');
  const status = document.getElementById('form-status');
  if (form && status) {
    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const mensaje = form.querySelector('#mensaje');
    const submitBtn = form.querySelector('button[type="submit"]');
    function checkFormValidity() {
      let valid = true;
      if (!nombre.value.trim() || nombre.value.trim().length < 2) {
        nombre.style.borderColor = "#b91732";
        valid = false;
      } else nombre.style.borderColor = "#189945";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = "#b91732";
        valid = false;
      } else email.style.borderColor = "#189945";
      if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        mensaje.style.borderColor = "#b91732";
        valid = false;
      } else mensaje.style.borderColor = "#189945";
      submitBtn.disabled = !valid;
      return valid;
    }
    [nombre, email, mensaje].forEach(field => {
      field.addEventListener('input', checkFormValidity);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      if (!checkFormValidity()) {
        status.textContent = "Por favor completa todos los campos correctamente.";
        status.classList.add('error');
        return;
      }
      status.textContent = '';
      const data = new FormData(form);
      fetch('https://formspree.io/f/mnqeyjrn', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        status.className = 'form-status';
        if (response.ok) {
          status.textContent = '¡Mensaje enviado correctamente!';
          status.classList.add('success');
          form.reset();
          [nombre, email, mensaje].forEach(f => f.style.borderColor = "#d3d3d3");
          submitBtn.disabled = true;
        } else {
          response.json().then(data => {
            status.textContent = data.errors ? data.errors.map(e => e.message).join(', ') : 'Ocurrió un error. Intenta más tarde.';
            status.classList.add('error');
          });
        }
      })
      .catch(() => {
        status.className = 'form-status error';
        status.textContent = 'No se pudo enviar el mensaje. Intenta nuevamente.';
      });
    });
    checkFormValidity();
  }
});
