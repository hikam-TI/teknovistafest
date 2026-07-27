// ==========================================
// 1. NAVBAR SCROLL
// ==========================================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ==========================================
// 2. PARTICLE CANVAS (HOME)
// ==========================================
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeParticleCanvas() {
    const hero = document.querySelector('.hero');
    if (hero) {
      particleCanvas.width = hero.offsetWidth;
      particleCanvas.height = hero.offsetHeight;
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.color = ['#379EF5', '#6CB4FF', '#E5E0C3', '#0A2E5A'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= dx * 0.01;
        this.y -= dy * 0.01;
      }
    }

    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      pCtx.fillStyle = this.color;
      pCtx.shadowBlur = 10;
      pCtx.shadowColor = this.color;
      pCtx.fill();
      pCtx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(100, Math.floor((particleCanvas.width * particleCanvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          pCtx.beginPath();
          pCtx.strokeStyle = `rgba(108, 180, 255, ${0.3 * (1 - dist / 130)})`;
          pCtx.lineWidth = 0.6;
          pCtx.moveTo(particles[i].x, particles[i].y);
          pCtx.lineTo(particles[j].x, particles[j].y);
          pCtx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  particleCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = particleCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resizeParticleCanvas();
    initParticles();
  });

  resizeParticleCanvas();
  initParticles();
  animateParticles();
}

// ==========================================
// 3. WAVE CANVAS (TALKSHOW)
// ==========================================
const waveCanvas = document.getElementById('waveCanvas');
if (waveCanvas) {
  const wCtx = waveCanvas.getContext('2d');
  let waveTime = 0;

  function resizeWaveCanvas() {
    const hero = document.querySelector('.page-hero');
    if (hero) {
      waveCanvas.width = hero.offsetWidth;
      waveCanvas.height = hero.offsetHeight;
    }
  }

  function drawWave() {
    wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    const colors = [
      { r: 55, g: 158, b: 245, amp: 60, freq: 0.008 },
      { r: 10, g: 46, b: 90, amp: 40, freq: 0.012 },
      { r: 229, g: 224, b: 195, amp: 50, freq: 0.01 }
    ];

    colors.forEach((color, i) => {
      wCtx.beginPath();
      wCtx.moveTo(0, waveCanvas.height);
      for (let x = 0; x <= waveCanvas.width; x += 5) {
        const y = waveCanvas.height * 0.6 +
                  Math.sin(x * color.freq + waveTime + i) * color.amp +
                  Math.sin(x * color.freq * 2 + waveTime * 1.5) * (color.amp * 0.5);
        wCtx.lineTo(x, y);
      }
      wCtx.lineTo(waveCanvas.width, waveCanvas.height);
      wCtx.closePath();
      const gradient = wCtx.createLinearGradient(0, 0, 0, waveCanvas.height);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
      wCtx.fillStyle = gradient;
      wCtx.fill();
    });

    waveTime += 0.02;
    requestAnimationFrame(drawWave);
  }

  window.addEventListener('resize', resizeWaveCanvas);
  resizeWaveCanvas();
  drawWave();
}

// ==========================================
// 4. AURORA CANVAS (CONTACT)
// ==========================================
const auroraCanvas = document.getElementById('auroraCanvas');
if (auroraCanvas) {
  const aCtx = auroraCanvas.getContext('2d');
  let auroraTime = 0;

  function resizeAuroraCanvas() {
    const contact = document.querySelector('.contact-page');
    if (contact) {
      auroraCanvas.width = contact.offsetWidth;
      auroraCanvas.height = contact.offsetHeight;
    }
  }

  function drawAurora() {
    aCtx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);
    const colors = [
      { r: 55, g: 158, b: 245 },
      { r: 10, g: 46, b: 90 },
      { r: 229, g: 224, b: 195 }
    ];

    for (let i = 0; i < 3; i++) {
      const color = colors[i];
      const gradient = aCtx.createLinearGradient(0, 0, auroraCanvas.width, auroraCanvas.height);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      aCtx.fillStyle = gradient;
      aCtx.beginPath();
      aCtx.moveTo(0, auroraCanvas.height * 0.5);
      for (let x = 0; x <= auroraCanvas.width; x += 20) {
        const y = auroraCanvas.height * 0.5 +
                  Math.sin(x * 0.005 + auroraTime + i) * 80 +
                  Math.sin(x * 0.01 + auroraTime * 1.5 + i * 2) * 40;
        aCtx.lineTo(x, y);
      }
      aCtx.lineTo(auroraCanvas.width, auroraCanvas.height);
      aCtx.lineTo(0, auroraCanvas.height);
      aCtx.closePath();
      aCtx.fill();
    }

    auroraTime += 0.01;
    requestAnimationFrame(drawAurora);
  }

  window.addEventListener('resize', resizeAuroraCanvas);
  resizeAuroraCanvas();
  drawAurora();
}

// ==========================================
// 5. COUNTER ANIMATION
// ==========================================
const counters = document.querySelectorAll('.stat-num');
let counterAnimated = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const start = performance.now();

    function updateCounter(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    requestAnimationFrame(updateCounter);
  });
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ==========================================
// 6. SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll('.feature-card, .value-card, .team-card, .competition-card, .speaker-card, .schedule-item, .contact-item, .timeline-item, .about-text-block, .about-visual, .contact-form, .category-hero-card, .stage-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(el);
});

// ==========================================
// 7. TALKSHOW TABS
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const scheduleItems = document.querySelectorAll('.schedule-item');

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.getAttribute('data-day');
      scheduleItems.forEach(item => {
        if (item.getAttribute('data-day') === day) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ==========================================
// 8. FORM SUBMIT
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ==========================================
// 9. PARALLAX MOUSE MOVE (ABOUT)
// ==========================================
const aboutVisual = document.querySelector('.about-visual');
if (aboutVisual) {
  const aboutSection = document.querySelector('.page-about');
  if (aboutSection) {
    aboutSection.addEventListener('mousemove', (e) => {
      const rect = aboutVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const cards = aboutVisual.querySelectorAll('.floating-card');
      cards.forEach((card, i) => {
        const depth = (i + 1) * 8;
        card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
  }
}

// ==========================================
// 10. FAQ 3D CANVAS
// ==========================================
const faq3dCanvas = document.getElementById('faq3dCanvas');
if (faq3dCanvas) {
  const ctx = faq3dCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeFAQCanvas() {
    const section = document.querySelector('.faq-section');
    if (section) {
      faq3dCanvas.width = section.offsetWidth;
      faq3dCanvas.height = section.offsetHeight;
    }
  }

  class FAQParticle {
    constructor() {
      this.x = Math.random() * faq3dCanvas.width;
      this.y = Math.random() * faq3dCanvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 3 + 2;
      this.color = ['#379EF5', '#6CB4FF', '#E5E0C3'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > faq3dCanvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > faq3dCanvas.height) this.vy *= -1;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        this.x -= dx * 0.02;
        this.y -= dy * 0.02;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initFAQParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((faq3dCanvas.width * faq3dCanvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new FAQParticle());
    }
  }

  function drawFAQConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 180, 255, ${0.4 * (1 - dist / 180)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateFAQ() {
    ctx.clearRect(0, 0, faq3dCanvas.width, faq3dCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawFAQConnections();
    requestAnimationFrame(animateFAQ);
  }

  faq3dCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = faq3dCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resizeFAQCanvas();
    initFAQParticles();
  });

  resizeFAQCanvas();
  initFAQParticles();
  animateFAQ();
}

// ==========================================
// 11. FAQ ACCORDION (VERSI STABIL & ROBUST)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question ? question.querySelector('.fa-chevron-down') : null;
    
    if (question && answer) {
      answer.style.maxHeight = '0';
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 0.4s ease, padding 0.4s ease';
      
      question.addEventListener('click', function(e) {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.fa-chevron-down');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0';
              otherAnswer.style.paddingBottom = '0';
            }
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });
        
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
          answer.style.paddingBottom = '0';
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          item.classList.add('active');
          const answerHeight = answer.scrollHeight;
          answer.style.maxHeight = (answerHeight + 20) + 'px';
          answer.style.paddingBottom = '20px';
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
});

// ==========================================
// 12. ABOUT US 3D CANVAS ANIMATION
// ==========================================
const about3dCanvas = document.getElementById('about3dCanvas');
if (about3dCanvas) {
  const ctx = about3dCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let scrollY = 0;

  function resizeAboutCanvas() {
    const hero = document.querySelector('.about-hero');
    if (hero) {
      about3dCanvas.width = hero.offsetWidth;
      about3dCanvas.height = hero.offsetHeight;
    }
  }

  class AboutParticle {
    constructor() {
      this.x = Math.random() * about3dCanvas.width;
      this.y = Math.random() * about3dCanvas.height;
      this.z = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 2 + 1;
      this.color = ['#379EF5', '#6CB4FF', '#E5E0C3'][Math.floor(Math.random() * 3)];
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx * this.z;
      this.y += this.vy * this.z;
      this.x += (mouseX - about3dCanvas.width / 2) * 0.0002 * this.z;
      this.y += (mouseY - about3dCanvas.height / 2) * 0.0002 * this.z;

      if (this.x < 0) this.x = about3dCanvas.width;
      if (this.x > about3dCanvas.width) this.x = 0;
      if (this.y < 0) this.y = about3dCanvas.height;
      if (this.y > about3dCanvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * this.z, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity / this.z;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * this.z * 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.1 / this.z;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initAboutParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor((about3dCanvas.width * about3dCanvas.height) / 12000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new AboutParticle());
    }
  }

  function drawAboutConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 180, 255, ${0.3 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateAbout3D() {
    ctx.clearRect(0, 0, about3dCanvas.width, about3dCanvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    drawAboutConnections();
    requestAnimationFrame(animateAbout3D);
  }

  about3dCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = about3dCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.about-hero');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        scrollY = window.scrollY;
        about3dCanvas.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    }
  });

  window.addEventListener('resize', () => {
    resizeAboutCanvas();
    initAboutParticles();
  });

  resizeAboutCanvas();
  initAboutParticles();
  animateAbout3D();
}

// ==========================================
// 13. COMPETITION PAGE 3D CANVAS (PARTIKEL KECIL & HALUS)
// ==========================================
const competition3dCanvas = document.getElementById('competition3dCanvas');
if (competition3dCanvas) {
  const ctx = competition3dCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeCompetitionCanvas() {
    const hero = document.querySelector('.competition-hero');
    if (hero) {
      competition3dCanvas.width = hero.offsetWidth;
      competition3dCanvas.height = hero.offsetHeight;
    }
  }

  class CompetitionParticle {
    constructor() {
      this.x = Math.random() * competition3dCanvas.width;
      this.y = Math.random() * competition3dCanvas.height;
      this.z = Math.random() * 2 + 0.5; // Depth 0.5-2.5
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.radius = Math.random() * 1.5 + 0.5; // Radius 0.5-2px (LEBIH KECIL)
      this.color = ['#379EF5', '#6CB4FF', '#E5E0C3'][Math.floor(Math.random() * 3)];
      this.opacity = Math.random() * 0.3 + 0.1; // Opacity 0.1-0.4 (LEBIH TRANSPARAN)
    }

    update() {
      this.x += this.vx * this.z;
      this.y += this.vy * this.z;

      this.x += (mouseX - competition3dCanvas.width / 2) * 0.0001 * this.z;
      this.y += (mouseY - competition3dCanvas.height / 2) * 0.0001 * this.z;

      if (this.x < 0) this.x = competition3dCanvas.width;
      if (this.x > competition3dCanvas.width) this.x = 0;
      if (this.y < 0) this.y = competition3dCanvas.height;
      if (this.y > competition3dCanvas.height) this.y = 0;
    }

    draw() {
      // Partikel kecil dengan glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initCompetitionParticles() {
    particles = [];
    // LEBIH BANYAK PARTIKEL (150 partikel)
    const particleCount = Math.min(150, Math.floor((competition3dCanvas.width * competition3dCanvas.height) / 8000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CompetitionParticle());
    }
  }

  function drawCompetitionConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // JARAK KONEKSI LEBIH PENDEK (80px)
        if (dist < 80) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 180, 255, ${0.15 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateCompetition3D() {
    ctx.clearRect(0, 0, competition3dCanvas.width, competition3dCanvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    drawCompetitionConnections();
    requestAnimationFrame(animateCompetition3D);
  }

  competition3dCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = competition3dCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resizeCompetitionCanvas();
    initCompetitionParticles();
  });

  resizeCompetitionCanvas();
  initCompetitionParticles();
  animateCompetition3D();
}

// ==========================================
// 14. COMPETITION MESH GRADIENT CANVAS
// ==========================================
const meshCanvas = document.getElementById('meshCanvas');
if (meshCanvas) {
  const ctx = meshCanvas.getContext('2d');
  let time = 0;
  let mouseX = 0, mouseY = 0;

  function resizeMesh() {
    const hero = document.querySelector('.comp-hero');
    if (hero) {
      meshCanvas.width = hero.offsetWidth;
      meshCanvas.height = hero.offsetHeight;
    }
  }

  function drawMesh() {
    ctx.clearRect(0, 0, meshCanvas.width, meshCanvas.height);
    
    // Animated gradient blobs
    const blobs = [
      { x: meshCanvas.width * 0.2, y: meshCanvas.height * 0.3, r: 300, color: '55, 158, 245' },
      { x: meshCanvas.width * 0.7, y: meshCanvas.height * 0.5, r: 350, color: '108, 180, 255' },
      { x: meshCanvas.width * 0.4, y: meshCanvas.height * 0.7, r: 280, color: '229, 224, 195' },
      { x: meshCanvas.width * 0.8, y: meshCanvas.height * 0.2, r: 250, color: '10, 46, 90' }
    ];

    blobs.forEach((blob, i) => {
      const offsetX = Math.sin(time * 0.001 + i) * 50;
      const offsetY = Math.cos(time * 0.0012 + i) * 40;
      
      const gradient = ctx.createRadialGradient(
        blob.x + offsetX,
        blob.y + offsetY,
        0,
        blob.x + offsetX,
        blob.y + offsetY,
        blob.r
      );
      
      gradient.addColorStop(0, `rgba(${blob.color}, 0.3)`);
      gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, meshCanvas.width, meshCanvas.height);
    });

    time += 16;
    requestAnimationFrame(drawMesh);
  }

  meshCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = meshCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', resizeMesh);
  resizeMesh();
  drawMesh();
}

