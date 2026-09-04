/* =========================================================
   SHARED WEBSITE JAVASCRIPT

   USED ACROSS:
   - Home
   - About
   - Works
   - Featured Works
   - Photography
   - Personal Designs
   - Contact
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================================
     TABLET / PHONE NAVIGATION MENU
  ========================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const menuBackdrop =
    document.querySelector(".menu-backdrop");

  const menuClose =
    document.querySelector(".menu-close");


  /*
     IMPORTANT:

     We DO NOT use "return" here anymore.

     That way, if a page somehow doesn't contain
     the mobile menu, other JavaScript such as
     the project carousel can still run.
  */

  if (
    menuToggle &&
    mobileMenu &&
    menuBackdrop &&
    menuClose
  ) {


    /* =====================================================
       OPEN MENU
    ====================================================== */

    function openMenu() {

      document.body.classList.add(
        "menu-open"
      );


      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );


      mobileMenu.setAttribute(
        "aria-hidden",
        "false"
      );

    }



    /* =====================================================
       CLOSE MENU
    ====================================================== */

    function closeMenu() {

      document.body.classList.remove(
        "menu-open"
      );


      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      mobileMenu.setAttribute(
        "aria-hidden",
        "true"
      );

    }



    /* =====================================================
       HAMBURGER BUTTON
    ====================================================== */

    menuToggle.addEventListener(
      "click",
      openMenu
    );



    /* =====================================================
       X CLOSE BUTTON
    ====================================================== */

    menuClose.addEventListener(
      "click",
      closeMenu
    );



    /* =====================================================
       CLICK BACKDROP TO CLOSE
    ====================================================== */

    menuBackdrop.addEventListener(
      "click",
      closeMenu
    );



    /* =====================================================
       ESC KEY TO CLOSE
    ====================================================== */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          document.body.classList.contains(
            "menu-open"
          )
        ) {

          closeMenu();

        }

      }
    );



    /* =====================================================
       CLOSE MENU AFTER CLICKING A LINK
    ====================================================== */

    const mobileLinks =
      mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });

  }



  /* =========================================================
     PROJECT CAROUSEL

     Used on:
     - featured-works.html
     - photography.html
     - personal-designs.html

     STRUCTURE:

              PREVIOUS
               small

              CURRENT
                BIG

                NEXT
               small

     Scroll/swipe changes which project is active.
  ========================================================= */

  const projectCarousels =
    document.querySelectorAll(
      ".project-carousel"
    );


  projectCarousels.forEach((carousel) => {


    const slides =
      Array.from(
        carousel.querySelectorAll(
          ".project-slide"
        )
      );


    /*
       No projects = nothing to initialize.
    */

    if (slides.length === 0) {
      return;
    }


    let currentIndex = 0;

    let wheelLocked = false;

    let touchStartY = 0;

    let touchEndY = 0;



    /* =====================================================
       UPDATE CAROUSEL

       Gives each project one of these classes:

       .is-active
       .is-prev
       .is-next
       .is-hidden
    ====================================================== */

    function updateCarousel() {

      const total =
        slides.length;


      /*
         Only one project.
      */

      if (total === 1) {

        slides[0].classList.remove(
          "is-prev",
          "is-next",
          "is-hidden"
        );


        slides[0].classList.add(
          "is-active"
        );


        slides[0].setAttribute(
          "aria-hidden",
          "false"
        );


        return;

      }


      /*
         Carousel loops.

         Example:

         current = 0

         previous =
         last project

         next =
         project 1
      */

      const previousIndex =
        (
          currentIndex -
          1 +
          total
        ) %
        total;


      const nextIndex =
        (
          currentIndex +
          1
        ) %
        total;



      slides.forEach(
        (slide, index) => {


          slide.classList.remove(
            "is-active",
            "is-prev",
            "is-next",
            "is-hidden"
          );



          /* ===============================
             CURRENT / BIG PROJECT
          =============================== */

          if (
            index === currentIndex
          ) {

            slide.classList.add(
              "is-active"
            );


            slide.setAttribute(
              "aria-hidden",
              "false"
            );


            return;

          }



          /* ===============================
             PREVIOUS / SMALL TOP PROJECT
          =============================== */

          if (
            index === previousIndex
          ) {

            slide.classList.add(
              "is-prev"
            );


            slide.setAttribute(
              "aria-hidden",
              "false"
            );


            return;

          }



          /* ===============================
             NEXT / SMALL BOTTOM PROJECT
          =============================== */

          if (
            index === nextIndex
          ) {

            slide.classList.add(
              "is-next"
            );


            slide.setAttribute(
              "aria-hidden",
              "false"
            );


            return;

          }



          /* ===============================
             OTHER PROJECTS
          =============================== */

          slide.classList.add(
            "is-hidden"
          );


          slide.setAttribute(
            "aria-hidden",
            "true"
          );

        }
      );

    }



    /* =====================================================
       NEXT PROJECT

       Loop:

       1 → 2 → 3 → 1
    ====================================================== */

    function nextProject() {

      currentIndex =
        (
          currentIndex + 1
        ) %
        slides.length;


      updateCarousel();

    }



    /* =====================================================
       PREVIOUS PROJECT

       Loop:

       1 ← 2 ← 3 ← 1
    ====================================================== */

    function previousProject() {

      currentIndex =
        (
          currentIndex -
          1 +
          slides.length
        ) %
        slides.length;


      updateCarousel();

    }



    /* =====================================================
       MOUSE WHEEL / TRACKPAD
    ====================================================== */

    carousel.addEventListener(
      "wheel",
      (event) => {


        /*
           Ignore very tiny trackpad movements.
        */

        if (
          Math.abs(event.deltaY) < 10
        ) {
          return;
        }


        event.preventDefault();



        /*
           Prevent one wheel gesture from
           moving through several projects.
        */

        if (wheelLocked) {
          return;
        }


        wheelLocked = true;



        /* SCROLL DOWN */

        if (
          event.deltaY > 0
        ) {

          nextProject();

        }


        /* SCROLL UP */

        else {

          previousProject();

        }



        window.setTimeout(
          () => {

            wheelLocked = false;

          },

          520
        );

      },

      {
        passive: false
      }
    );



    /* =====================================================
       KEYBOARD SUPPORT
    ====================================================== */

    carousel.setAttribute(
      "tabindex",
      "0"
    );


    carousel.addEventListener(
      "keydown",
      (event) => {


        /* NEXT */

        if (
          event.key === "ArrowDown" ||
          event.key === "ArrowRight" ||
          event.key === "PageDown"
        ) {

          event.preventDefault();

          nextProject();

        }



        /* PREVIOUS */

        if (
          event.key === "ArrowUp" ||
          event.key === "ArrowLeft" ||
          event.key === "PageUp"
        ) {

          event.preventDefault();

          previousProject();

        }

      }
    );



    /* =====================================================
       PHONE / TABLET SWIPE START
    ====================================================== */

    carousel.addEventListener(
      "touchstart",
      (event) => {

        touchStartY =
          event.changedTouches[0]
            .clientY;

      },

      {
        passive: true
      }
    );



    /* =====================================================
       PHONE / TABLET SWIPE END
    ====================================================== */

    carousel.addEventListener(
      "touchend",
      (event) => {


        touchEndY =
          event.changedTouches[0]
            .clientY;


        const swipeDistance =
          touchStartY -
          touchEndY;



        /*
           Ignore tiny finger movements.
        */

        if (
          Math.abs(swipeDistance) < 45
        ) {
          return;
        }



        /*
           SWIPE UP
           =
           NEXT PROJECT
        */

        if (
          swipeDistance > 0
        ) {

          nextProject();

        }



        /*
           SWIPE DOWN
           =
           PREVIOUS PROJECT
        */

        else {

          previousProject();

        }

      },

      {
        passive: true
      }
    );



    /* =====================================================
       CLICK SMALL PROJECT

       If visitor clicks:

       PREVIOUS small preview
       or
       NEXT small preview

       it becomes the ACTIVE project.

       It does NOT immediately navigate away.

       Once it becomes big/active,
       clicking it opens the project detail page.
    ====================================================== */

    slides.forEach(
      (slide, index) => {


        slide.addEventListener(
          "click",
          (event) => {


            const isPrevious =
              slide.classList.contains(
                "is-prev"
              );


            const isNext =
              slide.classList.contains(
                "is-next"
              );



            /*
               Small carousel item clicked.
            */

            if (
              isPrevious ||
              isNext
            ) {

              event.preventDefault();


              currentIndex =
                index;


              updateCarousel();

            }

          }
        );

      }
    );



    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateCarousel();


  });

});


/* =========================================================
   WORK DETAIL MEDIA VIEWER

   Controls the up/down buttons on individual
   project detail pages.
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    const detailPages =
      document.querySelectorAll(
        ".work-detail-layout"
      );


    detailPages.forEach(
      (detailPage) => {


        const mediaItems =
          Array.from(
            detailPage.querySelectorAll(
              ".work-media-item"
            )
          );


        const controls =
          detailPage.querySelector(
            ".work-version-controls"
          );


        const upButton =
          detailPage.querySelector(
            ".work-version-up"
          );


        const downButton =
          detailPage.querySelector(
            ".work-version-down"
          );


        /*
           Nothing to control.
        */

        if (
          !mediaItems.length ||
          !controls ||
          !upButton ||
          !downButton
        ) {
          return;
        }


        let currentMediaIndex = 0;



        /* =================================================
           UPDATE MEDIA
        ================================================== */

        function updateWorkMedia() {


          mediaItems.forEach(
            (item, index) => {


              /*
                 Pause videos that are being hidden.
              */

              if (
                item.tagName === "VIDEO" &&
                index !== currentMediaIndex
              ) {

                item.pause();

              }


              item.classList.toggle(
                "is-active",
                index === currentMediaIndex
              );

            }
          );

        }



        /* =================================================
           ONLY ONE VERSION

           Hide arrows automatically.
        ================================================== */

        if (
          mediaItems.length <= 1
        ) {

          controls.classList.add(
            "is-disabled"
          );

          updateWorkMedia();

          return;

        }



        /* =================================================
           PREVIOUS VERSION

           Loops:
           1 ← 2 ← 3 ← 1
        ================================================== */

        function previousVersion() {

          currentMediaIndex =
            (
              currentMediaIndex -
              1 +
              mediaItems.length
            ) %
            mediaItems.length;


          updateWorkMedia();

        }



        /* =================================================
           NEXT VERSION

           Loops:
           1 → 2 → 3 → 1
        ================================================== */

        function nextVersion() {

          currentMediaIndex =
            (
              currentMediaIndex + 1
            ) %
            mediaItems.length;


          updateWorkMedia();

        }



        /* =================================================
           BUTTON EVENTS
        ================================================== */

        upButton.addEventListener(
          "click",
          previousVersion
        );


        downButton.addEventListener(
          "click",
          nextVersion
        );



        /* =================================================
           KEYBOARD

           When user is on this detail page:

           ↑ = previous version
           ↓ = next version
        ================================================== */

        detailPage.addEventListener(
          "keydown",
          (event) => {


            if (
              event.key === "ArrowUp"
            ) {

              event.preventDefault();

              previousVersion();

            }


            if (
              event.key === "ArrowDown"
            ) {

              event.preventDefault();

              nextVersion();

            }

          }
        );


        detailPage.setAttribute(
          "tabindex",
          "0"
        );



        /* INITIAL STATE */

        updateWorkMedia();


      }
    );


  }
);

document.addEventListener("DOMContentLoaded", () => {

   /* =======================================================
     CREATE VIDEO LOADER
  ======================================================= */

  const loader = document.createElement("div");

  loader.className = "page-video-loader";

  loader.innerHTML = `
    <video
      class="page-loader-video"
      muted
      playsinline
      preload="auto"
    >
      <source src="image/loading_screen_4.mp4" type="video/mp4">
    </video>
  `;

  document.body.appendChild(loader);


  const loaderVideo = loader.querySelector(".page-loader-video");

  const LOADING_DURATION = 3000;

  let isNavigating = false;


  /* =======================================================
     ONLY NAVIGATION BAR BUTTONS
  ======================================================= */

  const navigationButtons = document.querySelectorAll(".nav-button");


  navigationButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      const href = button.getAttribute("href");

      if (!href) return;


      /* Allow Ctrl / Cmd / Shift click normally */

      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }


      event.preventDefault();


      /* Prevent double clicking */

      if (isNavigating) return;

      isNavigating = true;


      const destination = new URL(
        href,
        window.location.href
      );


      /* ===================================================
         SHOW LOADING VIDEO
      =================================================== */

      loader.classList.add("is-active");

      loaderVideo.currentTime = 0;

      loaderVideo.play().catch(() => {
        // Still navigate even if browser blocks video playback.
      });


      /* ===================================================
         OPEN PAGE AFTER 3 SECONDS
      =================================================== */

      setTimeout(() => {

        window.location.href = destination.href;

      }, LOADING_DURATION);

    });

  });

});

/* =========================================================
   HOMEPAGE INTRO VIDEO
   - Video starts immediately
   - Navbar stays hidden while video is playing
   - Video fits different screen sizes via CSS
   - When video ends:
       1. navbar slides down
       2. navbar becomes clickable
       3. DVD PNG slowly appears
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const homePage = document.querySelector(".home-page");
  const introLayer = document.querySelector(".home-intro-layer");
  const introVideo = document.querySelector(".home-intro-video");

  // Only run this on the homepage
  if (!homePage || !introLayer || !introVideo) return;

  let introFinished = false;


  /* =======================================================
     FINISH HOMEPAGE INTRO
  ======================================================= */

  function finishHomeIntro() {
    if (introFinished) return;

    introFinished = true;

    /*
      This class is used by the CSS to:
      - slide navbar down
      - enable navbar interaction
      - fade DVD PNG in
      - fade intro video out
    */
    homePage.classList.add("home-intro-complete");


    /*
      Remove video layer after the transition
      so it no longer sits on top of the page.
    */
    setTimeout(() => {
      introVideo.pause();
      introLayer.remove();
    }, 1400);
  }


  /* =======================================================
     START VIDEO
  ======================================================= */

  function startIntroVideo() {
    /*
      IMPORTANT:
      Do NOT set currentTime = 0 here.

      The autoplay attribute in index.html may already have
      started the video before DOMContentLoaded.

      Resetting currentTime here could make it restart.
    */

    if (!introVideo.paused && !introVideo.ended) {
      return;
    }

    introVideo
      .play()
      .catch(() => {
        /*
          If autoplay is temporarily unavailable,
          wait until the video can play.
        */
        introVideo.addEventListener(
          "canplay",
          () => {
            introVideo.play().catch(() => {
              /*
                If playback still fails, reveal the homepage
                instead of leaving the navbar hidden forever.
              */
              finishHomeIntro();
            });
          },
          { once: true }
        );
      });
  }


  /* =======================================================
     VIDEO FINISHED
  ======================================================= */

  introVideo.addEventListener(
    "ended",
    finishHomeIntro
  );


  /* =======================================================
     VIDEO ERROR FALLBACK
  ======================================================= */

  introVideo.addEventListener(
    "error",
    finishHomeIntro
  );


  /* =======================================================
     START AS SOON AS POSSIBLE
  ======================================================= */

  if (introVideo.readyState >= 2) {
    startIntroVideo();
  } else {
    introVideo.addEventListener(
      "loadeddata",
      startIntroVideo,
      { once: true }
    );
  }
});

/* =========================================================
   ABOUT — SILVER FRAME TYPEWRITER
   CLICK ORIGINAL .display-frame
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const frame =
    document.querySelector(".display-frame");

  const typedText =
    document.querySelector(".display-frame-typed-text");

  if (!frame || !typedText) {
    return;
  }


  const fullText =
    typedText.dataset.text || "";


  let typingTimer = null;
  let currentCharacter = 0;


  function startTyping() {

    if (typingTimer) {
      clearTimeout(typingTimer);
    }


    typedText.textContent = "";

    currentCharacter = 0;


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    if (reducedMotion) {
      typedText.textContent = fullText;
      return;
    }


    function typeNextCharacter() {

      typedText.textContent =
        fullText.slice(
          0,
          currentCharacter + 1
        );


      currentCharacter += 1;


      if (
        currentCharacter <
        fullText.length
      ) {

        typingTimer =
          setTimeout(
            typeNextCharacter,
            28
          );

      }

    }


    typeNextCharacter();

  }


  frame.addEventListener(
    "click",
    startTyping
  );

});

/* =========================================================
   ABOUT — KEEP TEXT INSIDE BLACK AREA OF SILVER FRAME
   Does NOT move or resize the original .display-frame
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const scene =
    document.querySelector(".about-scene");

  const frame =
    document.querySelector(".display-frame");

  const textLayer =
    document.querySelector(".about-frame-text-layer");


  if (!scene || !frame || !textLayer) {
    return;
  }


  function syncSilverFrameText() {

    const sceneRect =
      scene.getBoundingClientRect();

    const frameRect =
      frame.getBoundingClientRect();


    if (
      frameRect.width <= 0 ||
      frameRect.height <= 0
    ) {
      return;
    }


    /* =====================================================
       INNER BLACK SCREEN AREA

       These percentages are relative to the REAL
       current silver-frame size.

       So when the frame scales on tablet / phone,
       this text area scales with it automatically.
    ====================================================== */

    const innerLeft =
      frameRect.width * 0.13;

    const innerTop =
      frameRect.height * 0.14;

    const innerWidth =
      frameRect.width * 0.74;

    const innerHeight =
      frameRect.height * 0.72;


    /* =====================================================
       POSITION TEXT INSIDE BLACK AREA
    ====================================================== */

    textLayer.style.left =
      `${
        frameRect.left
        - sceneRect.left
        + innerLeft
      }px`;


    textLayer.style.top =
      `${
        frameRect.top
        - sceneRect.top
        + innerTop
      }px`;


    textLayer.style.width =
      `${innerWidth}px`;


    textLayer.style.height =
      `${innerHeight}px`;


    /* no extra padding */
    textLayer.style.padding =
      "0";


    /*
       Font-size variable now follows the INNER
       black area instead of the whole frame.
    */

    textLayer.style.setProperty(
      "--silver-frame-width",
      `${innerWidth}px`
    );

  }


  /* initial sync */

  requestAnimationFrame(
    syncSilverFrameText
  );


  /* run again after PNG finishes loading */

  if (!frame.complete) {

    frame.addEventListener(
      "load",
      syncSilverFrameText,
      { once: true }
    );

  }


  /* browser resize */

  window.addEventListener(
    "resize",
    syncSilverFrameText
  );


  /* phone rotation */

  window.addEventListener(
    "orientationchange",
    syncSilverFrameText
  );


  /* follow any CSS responsive resize of the frame */

  if ("ResizeObserver" in window) {

    const frameObserver =
      new ResizeObserver(
        syncSilverFrameText
      );

    frameObserver.observe(frame);

  }

});