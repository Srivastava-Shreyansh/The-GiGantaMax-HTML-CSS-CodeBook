/* ═══════════════════════════════════════════════════════════════
   SENSEI_SS PORTFOLIO — script.js
   Futuristic | Cyberpunk | Anime-Inspired
   ═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   1. PARTICLE CANVAS BACKGROUND
══════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas  = document.getElementById('particleCanvas');
  const ctx     = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      r:    Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.65 ? '#a855f7' : '#00d4ff',
    };
  }

  for (let i = 0; i < 120; i++) particles.push(createParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    /* Connection lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* Dots */
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba').replace('#00d4ff', `rgba(0,212,255,${p.alpha})`).replace('#a855f7', `rgba(168,85,247,${p.alpha})`);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
        Object.assign(p, createParticle());
      }
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

/* ══════════════════════════════════════════════════════════════
   2. TYPING ANIMATION
══════════════════════════════════════════════════════════════ */
(function initTyping() {
  const taglines = [
    'AI & ML Enthusiast',
    'Future Cybersecurity Police Officer',
    'Real-World Problem Solver',
    'B.Tech CSE (AI & ML) Student',
  ];

  const el        = document.getElementById('typingText');
  let   tagIdx    = 0;
  let   charIdx   = 0;
  let   deleting  = false;
  let   pauseTick = 0;

  function type() {
    const current = taglines[tagIdx];

    if (!deleting && pauseTick === 0) {
      /* Typing forward */
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        pauseTick = 50;   /* pause before deleting */
        deleting  = true;
      }
      setTimeout(type, 55);
    } else if (deleting && pauseTick === 0) {
      /* Deleting */
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting  = false;
        tagIdx    = (tagIdx + 1) % taglines.length;
        setTimeout(type, 420);   /* pause before next word */
      } else {
        setTimeout(type, 35);
      }
    } else {
      pauseTick--;
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 800);
})();

/* ══════════════════════════════════════════════════════════════
   3. STICKY NAVBAR — scroll class + active link
══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    /* Sticky glass effect */
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    /* Active link highlight */
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });

    navLinks.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === current);
    });
  });

  /* Hamburger toggle */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  /* Close mobile menu on link click */
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   4. SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════════════════════════ */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  /* Stagger child elements inside reveal groups */
  document.querySelectorAll('.skills-grid .skill-card, .projects-grid .project-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
})();

/* ══════════════════════════════════════════════════════════════
   5. PROJECT MODAL DATA
══════════════════════════════════════════════════════════════ */
const PROJECTS = {
  vacool: {
    badge:       'Hardware / Product Design',
    title:       'VaCool Milk',
    tagline:     null,
    description: 'A double insulated 304 stainless steel milk storage container engineered to prevent spoilage through advanced thermal retention. Designed to keep milk fresh for longer without electricity.',
    features:    null,
    tech:        ['Onshape CAD', '3D Printing'],
    role:        'Researcher, PPT Presentation, Pitching',
  },
  thelatak: {
    badge:       'Web App / Social Impact',
    title:       'ThelaTak',
    tagline:     'Digitizing street food discovery and ordering—without delivery.',
    description: 'Location-based street food discovery platform bridging the gap between vendors and walk-in customers while preserving the authentic street food experience.',
    features: [
      'Live vendor location tracking',
      'Digital menu with fixed pricing',
      'App-based stall ordering system',
      'UPI + cash with transaction logging',
      'Zero delivery model to maintain authenticity',
    ],
    tech: ['MERN Stack'],
    role: 'Researcher, PPT Formation',
  },
  sarkarsathi: {
    badge:       'AI / Civic Tech',
    title:       'SarkarSathi',
    tagline:     null,
    description: 'An AI-powered assistant designed to bridge the information gap, helping citizens easily find and understand government welfare schemes through intelligent recommendations.',
    features: [
      'Text and voice interaction capabilities',
      'Smart personalized recommendation system',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Node.js'],
    role: 'UI/UX Developer, Presentation',
  },
};

/* ══════════════════════════════════════════════════════════════
   6. MODAL OPEN / CLOSE
══════════════════════════════════════════════════════════════ */
function openModal(projectKey) {
  const p   = PROJECTS[projectKey];
  const el  = document.getElementById('modalContent');
  const overlay = document.getElementById('modalOverlay');

  if (!p) return;

  let featuresHTML = '';
  if (p.features) {
    featuresHTML = `
      <p class="modal-section-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        CORE FEATURES
      </p>
      <ul class="modal-features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
  }

  const techHTML = p.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('');

  el.innerHTML = `
    <div class="modal-badge">${p.badge}</div>
    <h2 class="modal-title">${p.title}</h2>
    ${p.tagline ? `<p class="modal-tagline">"${p.tagline}"</p>` : ''}
    <p class="modal-desc">${p.description}</p>
    ${featuresHTML}
    <p class="modal-section-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
      TECH STACK
    </p>
    <div class="modal-tech-tags">${techHTML}</div>
    <p class="modal-section-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ROLE
    </p>
    <p class="modal-role">${p.role}</p>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ══════════════════════════════════════════════════════════════
   7. CONTACT FORM — success state
══════════════════════════════════════════════════════════════ */
function handleContactSubmit(e) {
  e.preventDefault();
  const btn    = document.getElementById('submitBtn');
  const form   = document.getElementById('contactForm');

  /* Submitting state */
  btn.disabled    = true;
  btn.innerHTML   = `
    <span style="display:inline-flex;align-items:center;gap:8px;">
      <span style="width:14px;height:14px;border:2px solid transparent;border-top-color:#00d4ff;border-radius:50%;display:inline-block;animation:btnSpin .7s linear infinite;"></span>
      Encrypting...
    </span>
  `;

  /* Add spinner keyframe once */
  if (!document.getElementById('btnSpinStyle')) {
    const style = document.createElement('style');
    style.id    = 'btnSpinStyle';
    style.textContent = '@keyframes btnSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }';
    document.head.appendChild(style);
  }

  /* Simulate network delay */
  setTimeout(() => {
    btn.innerHTML = `
      Transmission Successful
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    `;
    btn.style.borderColor = '#00ff88';
    btn.style.color       = '#00ff88';
    btn.style.boxShadow   = '0 0 20px rgba(0,255,136,0.3)';

    /* Reset after 3s */
    setTimeout(() => {
      btn.disabled      = false;
      btn.innerHTML     = `Transmit Data <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      btn.style.borderColor = '';
      btn.style.color       = '';
      btn.style.boxShadow   = '';
      form.reset();
    }, 3000);
  }, 1600);
}

/* ══════════════════════════════════════════════════════════════
   8. SMOOTH ACTIVE SECTION HIGHLIGHT on scroll
══════════════════════════════════════════════════════════════ */
(function initSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', entry.isIntersecting);
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => io.observe(s));
})();
