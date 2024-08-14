document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Créer une timeline GSAP
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".card-grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Ajouter les animations des cartes à la timeline
  timeline.fromTo(
    ".card",
    { opacity: 0, y: 50 }, // État initial
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3, // Animation décalée entre les cartes
      ease: "power2.out",
    }
  );

  // Ajouter l'animation du footer à la timeline après les cartes
  timeline.fromTo(
    "footer",
    { opacity: 0, y: 50 }, // État initial
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }
  );
});
