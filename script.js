var timeout;

// Initialize Locomotive Scroll for smooth scrolling
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// First Page Animations with GSAP
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })
    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

// Mini Circle Cursor Effect with Scaling & Movement
function customCursorEffect() {
  const cursor = document.querySelector("#minicircle");
  let xscale = 1,
    yscale = 1;
  let xprev = 0,
    yprev = 0;

  window.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);

    let xdiff = e.clientX - xprev;
    let ydiff = e.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, Math.abs(xdiff) * 0.01);
    yscale = gsap.utils.clamp(0.8, 1.2, Math.abs(ydiff) * 0.01);

    xprev = e.clientX;
    yprev = e.clientY;

    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      scaleX: xscale,
      scaleY: yscale,
      ease: "power3.out",
      duration: 0.2,
    });

    timeout = setTimeout(() => {
      gsap.to(cursor, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.2,
      });
    }, 100);
  });
}

// Image Hover Effect with Dynamic Rotation
function imageHoverEffect() {
  document.querySelectorAll(".elem").forEach((elem) => {
    let rotate = 0;
    let diffrot = 0;
    let img = elem.querySelector("img");

    elem.addEventListener("mouseleave", () => {
      gsap.to(img, {
        opacity: 0,
        ease: "power3.out",
        duration: 0.5,
      });
    });

    elem.addEventListener("mousemove", (e) => {
      let diff = e.clientY - elem.getBoundingClientRect().top;
      diffrot = e.clientX - rotate;
      rotate = e.clientX;

      gsap.to(img, {
        opacity: 1,
        ease: "power3.out",
        top: diff,
        left: e.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        scale: 1.1, // Slight scale effect for depth
      });
    });
  });
}

// Initialize Functions
customCursorEffect();
imageHoverEffect();
firstPageAnim();
