document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ==========================================
  // 1. SHERY.JS INITIALIZATIONS
  // ==========================================

  // Custom Mouse Follower
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  // Magnetic Effect on H1
  Shery.makeMagnet(".magnet-target", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  // Text Animation on H2
  Shery.textAnimate(".animate-text", {
    style: 1,
    y: 10,
    delay: 0.1,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
  });

  // Image Masker Shader on Image
  Shery.imageMasker("#mask-image", {
    mouseFollower: true,
    text: "Shery",
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  // Hover Media Circle on Box
  Shery.hoverWithMediaCircle("#media-hover-trigger", {
    images: [
      "https://images.unsplash.com/photo-1786157463450-84b0b85c7bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTJ8fHxlbnwwfHx8fHw%3D",
      "https://plus.unsplash.com/premium_photo-1786020649043-c7086290af11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTR8fHxlbnwwfHx8fHw%3D",
    ],
  });


  // ==========================================
  // 2. SPACE FOR CUSTOM GSAP / SCROLLTRIGGER
  // ==========================================

    gsap.to(".img-wrapper", {
      scrollTrigger: {
        trigger: ".img-wrapper",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      scale: 1.1,
    });


  // ==========================================
  // 3. RESERVED SPACE FOR THREE.JS / SPLINE 3D
  // ==========================================

  function init3DScene() {
    const container = document.getElementById("threejs-canvas-container");
    if (!container) return;

    if (typeof THREE === "undefined") {
      console.warn("Three.js is not loaded.");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.32, 96, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.35,
      metalness: 0.55,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x202038, 1.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    camera.position.set(0, 0, 4.5);

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const animate = () => {
      mesh.rotation.x += 0.006;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    console.log("3D Canvas space ready for Three.js initialization.");
  }

  // Initialize 3D space
  init3DScene();

});
