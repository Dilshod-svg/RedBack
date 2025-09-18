   const burger = document.getElementById("burgerBtn");
   const nav = document.getElementById("navMenu");
   const overlay = document.getElementById("overlay");
   const burgerIcon = burger.querySelector("i");

   burger.addEventListener("click", () => {
       nav.classList.toggle("active");
       overlay.classList.toggle("active");
       // Icon almashtirish
       if (nav.classList.contains("active")) {
           burgerIcon.classList.remove("fa-bars");
           burgerIcon.classList.add("fa-xmark");
       } else {
           burgerIcon.classList.remove("fa-xmark");
           burgerIcon.classList.add("fa-bars");
       }
   });

   overlay.addEventListener("click", () => {
       nav.classList.remove("active");
       overlay.classList.remove("active");
       burgerIcon.classList.remove("fa-xmark");
       burgerIcon.classList.add("fa-bars");
   });

   // Kategoriyaga tushganda animatsiya ishlashi
   const cards1 = document.querySelectorAll('.card');

   const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('show');
               entry.target.classList.remove('hidden');
           }
       });
   }, {
       threshold: 0.2 // 20% ko‘ringanda animatsiya boshlanadi
   });

   cards1.forEach(card => {
       observer.observe(card);
   });