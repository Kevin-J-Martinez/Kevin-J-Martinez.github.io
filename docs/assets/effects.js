document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================================
     DYNAMIC DATA / NETWORK BACKGROUND
     (skipped entirely if the user prefers reduced motion)
     ========================================================= */

  if (!prefersReducedMotion) {

    const canvas = document.createElement("canvas");

    canvas.id = "data-background";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    let particles = [];
    let waves = [];
    let sparks = [];

    let time = 0;
    let animationFrameId = null;

    const mouse = {
      x: width / 2,
      y: height / 2,
      active: false
    };


    /* =========================================================
       SETTINGS
       ========================================================= */

    const settings = {
      particleCount: 95,
      mobileParticleCount: 48,
      maxDistance: 175,
      mouseDistance: 210,
      speed: 0.28,
      waveSpeed: 0.35,
      backgroundOpacity: 1
    };


    /* =========================================================
       CANVAS
       ========================================================= */

    function resizeCanvas() {

      const ratio = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    }

    resizeCanvas();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });


    /* =========================================================
       PARTICLES
       ========================================================= */

    function createParticles() {

      particles = [];

      const count =
        window.innerWidth < 700
          ? settings.mobileParticleCount
          : settings.particleCount;

      for (let i = 0; i < count; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = settings.speed * (0.35 + Math.random() * 1.4);

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.30 + 0.18,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.008,
          drift: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.008 + 0.002
        });

      }

    }

    createParticles();


    /* =========================================================
       MOUSE
       ========================================================= */

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    });

    window.addEventListener("mouseleave", () => {
      mouse.active = false;
    });


    /* =========================================================
       PARTICLE MOVEMENT
       ========================================================= */

    function updateParticle(particle) {

      particle.drift += particle.driftSpeed;
      particle.pulse += particle.pulseSpeed;

      /* Organic drifting movement */
      particle.x += particle.vx + Math.sin(particle.drift) * 0.08;
      particle.y += particle.vy + Math.cos(particle.drift) * 0.08;

      /* Screen wrapping */
      if (particle.x < -30) particle.x = width + 30;
      if (particle.x > width + 30) particle.x = -30;
      if (particle.y < -30) particle.y = height + 30;
      if (particle.y > height + 30) particle.y = -30;

      /* Mouse influence */
      if (!mouse.active) return;

      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < settings.mouseDistance && distance > 0) {

        const force =
          (settings.mouseDistance - distance) / settings.mouseDistance;

        particle.x += (dx / distance) * force * 0.35;
        particle.y += (dy / distance) * force * 0.35;

      }

    }


    /* =========================================================
       PARTICLE DRAWING
       ========================================================= */

    function drawParticle(particle) {

      const pulse = Math.sin(particle.pulse) * 0.35 + 0.65;
      const radius = particle.radius * pulse;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(39, 82, 112, ${particle.opacity})`;
      ctx.fill();

      /* Small glow */
      if (particle.radius > 1.5) {

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(49, 91, 120, ${particle.opacity * 0.055})`;
        ctx.fill();

      }

    }


    /* =========================================================
       CONNECTIONS
       ========================================================= */

    function drawConnection(a, b, distance) {

      const strength = 1 - distance / settings.maxDistance;
      const opacity = strength * 0.19;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(49, 91, 120, ${opacity})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();

    }


    /* =========================================================
       MOVING CONNECTION HIGHLIGHTS
       ========================================================= */

    function drawMovingLink(a, b, distance) {

      if (distance > settings.maxDistance) return;

      const strength = 1 - distance / settings.maxDistance;
      const phase = (time * 0.015 + a.x * 0.004 + b.y * 0.004) % 1;

      if (phase < 0.08) {

        const x = a.x + (b.x - a.x) * (phase / 0.08);
        const y = a.y + (b.y - a.y) * (phase / 0.08);

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(49, 91, 120, ${strength * 0.65})`;
        ctx.fill();

      }

    }


    /* =========================================================
       MOUSE CONNECTIONS
       ========================================================= */

    function drawMouseConnection(particle) {

      if (!mouse.active) return;

      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > settings.mouseDistance) return;

      const opacity = (1 - distance / settings.mouseDistance) * 0.30;

      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(49, 91, 120, ${opacity})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();

    }


    /* =========================================================
       AUTONOMOUS WAVES
       ========================================================= */

    function createWave() {

      if (Math.random() > 0.018) return;

      waves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 5,
        maxRadius: 90 + Math.random() * 120,
        opacity: 0.13
      });

    }

    function drawWaves() {

      waves.forEach((wave) => {

        wave.radius += settings.waveSpeed;
        wave.opacity *= 0.995;

        const progress = wave.radius / wave.maxRadius;

        if (progress >= 1) return;

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(49, 91, 120, ${wave.opacity * (1 - progress)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

      });

      waves = waves.filter((wave) => wave.radius < wave.maxRadius);

    }


    /* =========================================================
       AUTONOMOUS SPARKS
       ========================================================= */

    function createSpark() {

      if (Math.random() > 0.025) return;

      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        life: 1,
        decay: Math.random() * 0.015 + 0.008
      });

    }

    function drawSparks() {

      sparks.forEach((spark) => {

        spark.life -= spark.decay;

        if (spark.life <= 0) return;

        const glow = spark.life * 0.65;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(49, 91, 120, ${glow})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(49, 91, 120, ${glow * 0.10})`;
        ctx.fill();

      });

      sparks = sparks.filter((spark) => spark.life > 0);

    }


    /* =========================================================
       MOUSE WAVE
       ========================================================= */

    function drawMouseWave() {

      if (!mouse.active) return;

      const pulse = (Math.sin(time * 0.045) + 1) / 2;
      const radius = 30 + pulse * 18;

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(49, 91, 120, 0.13)";
      ctx.lineWidth = 1;
      ctx.stroke();

    }


    /* =========================================================
       MAIN ANIMATION
       ========================================================= */

    function animate() {

      time++;

      ctx.clearRect(0, 0, width, height);

      /* Update particles */
      particles.forEach(updateParticle);

      /* Connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < settings.maxDistance) {
            drawConnection(a, b, distance);
            drawMovingLink(a, b, distance);
          }

        }
      }

      /* Particles */
      particles.forEach(drawParticle);

      /* Mouse interaction */
      particles.forEach(drawMouseConnection);
      drawMouseWave();

      /* Autonomous effects */
      createWave();
      drawWaves();
      createSpark();
      drawSparks();

      animationFrameId = requestAnimationFrame(animate);

    }

    animate();

    /* Pause the animation while the tab is hidden, to save
       CPU/battery, and resume it when the user comes back. */
    document.addEventListener("visibilitychange", () => {

      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }

    });

  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".hero-content > *, .content-section, .archive-section, .interest-item, .archive-row"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element, index) => {

    element.style.transitionDelay = `${Math.min(index * 0.06, 0.3)}s`;
    observer.observe(element);

  });


  /* =========================================================
     READING PROGRESS
     ========================================================= */

  const progress = document.createElement("div");

  progress.id = "reading-progress";

  document.body.appendChild(progress);

  function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (documentHeight <= 0) {
      progress.style.width = "0%";
      return;
    }

    const percentage = (scrollTop / documentHeight) * 100;

    progress.style.width = `${percentage}%`;

  }

  window.addEventListener("scroll", updateProgress, { passive: true });

  updateProgress();


  /* =========================================================
     BACK TO TOP
     ========================================================= */

  const backButton = document.createElement("button");

  backButton.id = "back-to-top";
  backButton.innerHTML = "↑";
  backButton.setAttribute("aria-label", "Back to top");

  document.body.appendChild(backButton);

  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 600) {
        backButton.classList.add("visible");
      } else {
        backButton.classList.remove("visible");
      }

    },
    { passive: true }
  );

  backButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* =========================================================
     BUTTON INTERACTIONS
     ========================================================= */

  const buttons = document.querySelectorAll(".hero-button");

  buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });

  });


  /* =========================================================
     ARCHIVE INTERACTIONS
     ========================================================= */

  const rows = document.querySelectorAll(".archive-row");

  rows.forEach((row) => {

    const arrow = row.querySelector(".archive-arrow");

    if (!arrow) return;

    row.addEventListener("mouseenter", () => {
      arrow.style.transform = "translateX(7px)";
    });

    row.addEventListener("mouseleave", () => {
      arrow.style.transform = "translateX(0)";
    });

  });

});