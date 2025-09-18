  (function() {
      // formni topamiz (siz yuborgan formda action="/dilshod.net")
      const form = document.querySelector('form[action="/dilshod.net"]') || document.querySelector('form');

      if (!form) {
          console.warn('Form topilmadi — script ishlamaydi.');
          return;
      }

      // inputlarni placeholder orqali topamiz (sizning markupdagi placeholderlar)
      const emailInput = form.querySelector('input[type="email"], input[placeholder="Email"]') ||
          document.querySelector('input[type="email"]');
      const nameInput = form.querySelector('input[placeholder="Ism"], input[type="text"]');
      const pass1Input = Array.from(form.querySelectorAll('input[type="password"], input')).find(i => i && i.placeholder && i.placeholder.toLowerCase().includes('parol kiriting')) ||
          form.querySelector('input[type="password"]');
      const pass2Input = Array.from(form.querySelectorAll('input[type="password"], input')).find(i => i && i.placeholder && i.placeholder.toLowerCase().includes('qayta')) ||
          (form.querySelectorAll('input[type="password"]').length > 1 ? form.querySelectorAll('input[type="password"]')[1] : null);

      // Agar ba'zi elementlar topilmasa, fallback qilib birinchi mos keluvchini olamiz
      const emailEl = emailInput || document.querySelector('input[type="email"], input[placeholder="Email"]');
      const nameEl = nameInput || document.querySelector('input[placeholder="Ism"], input[type="text"]');
      const p1El = pass1Input || (document.querySelectorAll('input[type="password"]')[0] || null);
      const p2El = pass2Input || (document.querySelectorAll('input[type="password"]')[1] || null);

      form.addEventListener('submit', function(e) {
          e.preventDefault();

          const email = emailEl ? emailEl.value.trim() : '';
          const name = nameEl ? nameEl.value.trim() : '';
          const p1 = p1El ? p1El.value : '';
          const p2 = p2El ? p2El.value : '';

          // Minimal tekshiruvlar
          if (!email) {
              alert('Iltimos email kiriting');
              if (emailEl) emailEl.focus();
              return;
          }
          // Oddiy email format tekshiruvi
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(email)) {
              alert('Iltimos to\'g\'ri email kiriting');
              if (emailEl) emailEl.focus();
              return;
          }

          if (!name) {
              alert('Iltimos ismingizni kiriting');
              if (nameEl) nameEl.focus();
              return;
          }

          if (!p1 || !p2) {
              alert('Iltimos parolni va parolni qaytani kiriting');
              if (p1El) p1El.focus();
              return;
          }

          if (p1 !== p2) {
              alert('Parollar mos emas ❌');
              if (p2El) p2El.focus();
              return;
          }

          // Demo uchun localStorage ga saqlaymiz (⚠️ xavfsizlik: ishlab chiqarishda bunday saqlamang)
          try {
              localStorage.setItem('userEmail', email);
              localStorage.setItem('userName', name);
              localStorage.setItem('userPassword', p1);
              alert('Registratsiya muvaffaqiyatli ✅ Endi kirishingiz mumkin');
              // Login sahifasiga yo'naltirish — agar login.html yo'q bo'lsa, foydalanuvchi qoladi
              window.location.href = 'login.html';
          } catch (err) {
              console.error('LocalStorage ga yozishda xato:', err);
              alert('Saqlashda xato yuz berdi — brauzer sozlamalarini tekshiring.');
          }
      });
  })();

  document.getElementById("googleBtn").addEventListener("click", function(e) {
      e.preventDefault();
      // Hozircha demo
      alert("Google orqali kirish (demo) ✅");
      window.location.href = "index.html"; // bosh sahifa
  });