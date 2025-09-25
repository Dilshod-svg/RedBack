  const userData = {
      username: 'admin',
      password: '0709'
  };

  const errorMsg = document.getElementById('errorMsg');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');

  function showError(text) {
      errorMsg.textContent = text;
      setTimeout(() => {
          errorMsg.textContent = '';
      }, 3500);
  }

  function login() {
      const u = usernameInput.value.trim();
      const p = passwordInput.value;

      if (!u || !p) {
          showError('Iltimos, foydalanuvchi nomi va parolni kiriting.');
          return;
      }

      if (u === userData.username && p === userData.password) {
          sessionStorage.setItem('loggedIn', 'true');
          window.location.href = 'index1.html';
      } else {
          showError('Xato foydalanuvchi nomi yoki parol!');
      }
  }

  [usernameInput, passwordInput].forEach(el =>
      el.addEventListener('keydown', e => {
          if (e.key === 'Enter') login();
      })
  );

  loginBtn.addEventListener('click', login);

  window.addEventListener('load', () => {
      if (sessionStorage.getItem('loggedIn') === 'true') {
          window.location.href = 'index1.html';
      }
  });







  // server.js (oddiy misol)
  const express = require('express');
  const session = require('express-session');
  const fs = require('fs');
  const path = require('path');

  const app = express();
  app.use(session({
      secret: 'changeme',
      resave: false,
      saveUninitialized: false
  }));

  // login -> session.user = { id: ... }
  app.post('/login', (req, res) => {
      // tekshirishni DB da qiling
      req.session.user = {
          id: 1,
          name: 'Dilshod'
      };
      res.json({
          ok: true
      });
  });

  // himoyalangan faylni oqimlab yuborish (stream)
  app.get('/content/:id', (req, res) => {
      if (!req.session.user) return res.status(401).send('Unauthorized');

      // tekshirib chiqing — user manashu contentni ko‘rishga ruxsatlimi?
      const filePath = path.join(__dirname, 'private', req.params.id + '.mp4');
      if (!fs.existsSync(filePath)) return res.status(404).send('Not found');

      const stat = fs.statSync(filePath);
      res.writeHead(200, {
          'Content-Type': 'video/mp4',
          'Content-Length': stat.size,
          // agar xohlasangiz Range request support qo'shing
      });
      fs.createReadStream(filePath).pipe(res);
  });

  app.listen(3000);