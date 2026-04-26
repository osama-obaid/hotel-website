

    (function () {
      // Mobile Menu Toggle - زر القائمة في وضع الهاتف
      const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');

      if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function (e) {
          e.stopPropagation();
          navLinks.classList.toggle('active');
          // تغيير شكل الزر عند الفتح
          const icon = menuToggle.querySelector('i');
          if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
          } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        });
      }

      // إغلاق القائمة عند النقر على رابط
      const navItems = document.querySelectorAll('.nav-links a');
      navItems.forEach(item => {
        item.addEventListener('click', function () {
          navLinks.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        });
      });

      // Navbar Hide on Scroll
      let lastScroll = 0;
      const navbar = document.getElementById('navbar');

      window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.classList.add('navbar-hidden');
        } else {
          navbar.classList.remove('navbar-hidden');
        }
        lastScroll = currentScroll;
      });

      // ========== السلايدر - حل المشكلة بالكامل ==========
      const slider = document.getElementById('slider');
      const slides = document.querySelectorAll('.slide');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const dotsContainer = document.getElementById('dots');

      if (slider && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;

        // Create dots
        if (dotsContainer) {
          dotsContainer.innerHTML = '';
          for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', (function (index) {
              return function () { goToSlide(index); };
            })(i));
            dotsContainer.appendChild(dot);
          }
        }

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
          if (slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
          }
          if (dots && dots.length) {
            dots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentSlide);
            });
          }
        }

        function nextSlide() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateSlider();
          resetAutoSlide();
        }

        function prevSlide() {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateSlider();
          resetAutoSlide();
        }

        function goToSlide(index) {
          currentSlide = index;
          updateSlider();
          resetAutoSlide();
        }

        function resetAutoSlide() {
          if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
          }
          autoSlideInterval = setInterval(nextSlide, 5000);
        }

        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Start auto slide
        autoSlideInterval = setInterval(nextSlide, 5000);

        // Pause auto slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
          sliderContainer.addEventListener('mouseenter', function () {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
          });
          sliderContainer.addEventListener('mouseleave', function () {
            autoSlideInterval = setInterval(nextSlide, 5000);
          });
        }

        // تأكد من عرض أول شريحة بشكل صحيح
        updateSlider();
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

      // Active link highlighting on scroll
      const sections = document.querySelectorAll('section');
      const navItems2 = document.querySelectorAll('.nav-links a');

      window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
          }
        });

        navItems2.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
      });

      // Form submission
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
          e.preventDefault();
          alert('شكراً لتواصلك معنا! سنقوم بالرد عليك قريباً.');
          contactForm.reset();
        });
      }
    })();
