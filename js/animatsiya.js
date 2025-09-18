       const hslider = document.getElementById("actionSlider");
       const btnLeft = document.getElementById("slideLeft");
       const btnRight = document.getElementById("slideRight");

       // 200px (karta) + 14px (gap)
       const cardWidth = 214;

       btnLeft.addEventListener("click", () => {
           hslider.scrollBy({
               left: -cardWidth,
               behavior: "smooth"
           });
       });

       btnRight.addEventListener("click", () => {
           hslider.scrollBy({
               left: cardWidth,
               behavior: "smooth"
           });
       });