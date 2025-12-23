// Симуляция базы данных для контактной формы
const contactDatabase = {
  messages: [],
  
  addMessage(name, email, subject, message) {
    const id = Date.now();
    const newMessage = {
      id,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleString('ru-RU'),
      status: 'received'
    };
    this.messages.push(newMessage);
    this.saveToLocalStorage();
    return newMessage;
  },
  
  getAllMessages() {
    return this.messages;
  },
  
  getMessageById(id) {
    return this.messages.find(msg => msg.id === id);
  },
  
  deleteMessage(id) {
    this.messages = this.messages.filter(msg => msg.id !== id);
    this.saveToLocalStorage();
    return true;
  },
  
  saveToLocalStorage() {
    localStorage.setItem('contactMessages', JSON.stringify(this.messages));
  },
  
  loadFromLocalStorage() {
    const data = localStorage.getItem('contactMessages');
    if (data) {
      this.messages = JSON.parse(data);
    }
  }
};

// Загрузить данные из localStorage при инициализации
contactDatabase.loadFromLocalStorage();

// Роутер SPA
class PortfolioApp {
  constructor() {
    this.appContent = document.getElementById('app-content');
    this.navLinks = document.querySelectorAll('nav a');
    this.logo = document.querySelector('.logo');
    
    this.setupRouting();
  }

  setupRouting() {
    // Обработка клика по ссылкам навигации
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigate(href);
      });
    });

    // Обработка клика по логотипу
    this.logo.addEventListener('click', (e) => {
      e.preventDefault();
      this.navigate('/about');
    });

    // Обработка кнопки назад браузера
    window.addEventListener('popstate', () => {
      this.renderPage();
    });

    // Загрузить начальную страницу
    this.renderPage();
  }

  navigate(path) {
    window.location.hash = path;
    this.renderPage();
  }

  getCurrentPath() {
    let path = window.location.hash.slice(1); // Убирает '#'
    if (path === '' || path === '/') path = '/about';
    return path;
  }

  updateActiveNavLink() {
    const currentPath = this.getCurrentPath();
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  }

  renderPage() {
    const path = this.getCurrentPath();
    let html = '';

    this.updateActiveNavLink();

    switch (path) {
      case '/about':
        html = this.renderAbout();
        break;
      case '/projects':
        html = this.renderProjects();
        break;
      case '/contacts':
        html = this.renderContacts();
        break;
      case '/404':
      default:
        html = this.render404();
    }

    this.appContent.innerHTML = html;
    
    // Если это страница контактов, добавить обработчик формы
    if (path === '/contacts') {
      this.setupContactForm();
    }

    // Если это страница проектов, загрузить GitHub проекты
    if (path === '/projects') {
      this.loadGitHubProjects();
    }

    // Если это 404 страница, загрузить Tenor скрипт
    if (path !== '/about' && path !== '/projects' && path !== '/contacts') {
      this.loadTenorScript();
    }
  }

  renderAbout() {
    return `
      <section id="about">
        <h2>Обо мне</h2>
        <div class="about-container">
          <div>
            <img src="photo.jpg" alt="Максим Буров" class="about-photo">
          </div>
          <div class="about-text">
            <p>
              Привет! Я Максим Буров, ГИС-программист и инженер-программист с опытом разработки ПО в Qt Creator на C++. 
              Специализируюсь на&nbsp;создании информационных систем, особенно в области геоинформационных систем.
            </p>
            <p>
              Кроме того, увлекаюсь созданием дизайна качественных и&nbsp;интересных презентаций на различные темы с использованием Google Slides, Adobe Photoshop и Figma. 
              Я верю, что хорошо оформленная презентация — это не просто набор слайдов, а мощный инструмент для передачи идей и вдохновления аудитории.
            </p>
            <p>
              В настоящее время работаю в компании "Мобильные информационные системы" в отделе разработки бортовых и&nbsp;наземных информационных систем. 
              Также обучаюсь в&nbsp;магистратуре в РТУ МИРЭА по направлению "Информационные системы и технологии (Индустриальное программирование)".
            </p>
            <p>
              Я быстро обучаем, коммуникабелен и всегда нацелен на результат. Тщательно анализирую и структурирую информацию, 
              ответственно подхожу к каждому проекту и внимателен к деталям.
            </p>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Навыки</h2>
        <div class="skills-grid">
          <div class="skill-card"><p>C++</p></div>
          <div class="skill-card"><p>Qt Creator</p></div>
          <div class="skill-card"><p>Go</p></div>
          <div class="skill-card"><p>PostgreSQL</p></div>
          <div class="skill-card"><p>Blender</p></div>
          <div class="skill-card"><p>Figma</p></div>
          <div class="skill-card"><p>VSC</p></div>
          <div class="skill-card"><p>QGIS</p></div>
          <div class="skill-card"><p>Photoshop</p></div>
          <div class="skill-card"><p>PowerPoint</p></div>
          <div class="skill-card"><p>Английский</p></div>
          <div class="skill-card"><p>Немецкий</p></div>
        </div>
      </section>

      <section id="experience">
        <h2>Опыт и образование</h2>
        <div class="experience-container">
          <div>
            <h3 style="margin-bottom: 30px; font-size: 20px;">Образование</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="date">2025 - наст. время</div>
                <h4>Магистратура РТУ МИРЭА</h4>
                <p>Кафедра индустриального программирования</p>
                <p>Информационные системы и технологии</p>
              </div>
              <div class="timeline-item">
                <div class="date">2025</div>
                <h4>Профессиональная переподготовка</h4>
                <p>Цифровая кафедра</p>
                <p>Менеджмент</p>
              </div>
              <div class="timeline-item">
                <div class="date">2021 - 2025</div>
                <h4>Бакалавриат РТУ МИРЭА</h4>
                <p>Кафедра геоинформационных систем</p>
                <p>Информационные системы и технологии</p>
              </div>
            </div>
          </div>
          <div>
            <h3 style="margin-bottom: 30px; font-size: 20px;">Опыт работы</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="date">07.2023 - наст. время</div>
                <h4>Инженер-программист</h4>
                <p>Мобильные информационные системы</p>
                <p>Разработка ПО в среде Qt Creator (C++)</p>
                <p>Отдел разработки бортовых и наземных информационных систем</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderProjects() {
    return `
      <section id="projects">
        <h2>Проекты GitHub</h2>
        <div id="portfolio-grid" class="portfolio-grid"></div>
      </section>

      <section id="presentations">
        <h2>Проекты презентаций</h2>
        <div id="presentations-container" class="presentations-container">
          <div class="presentation-slide">
            <div class="slide-wrapper">
              <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRfs5JAirGLT7SQcKjt-gslTmbB0WK5NNNPq8qazensq6wS84qtoMcDHKWDRtwoB1Z6Y9DK_p4wClAg/pubembed?start=false&loop=false&delayms=1000" 
              frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
            </div>
            <h3>Чернобыль. Причины и последствия.</h3>
            <p>Что на самом деле произошло 26 апреля 1986 года</p>
            <a href="https://docs.google.com/presentation/d/1lvKWfX0iNWh5NAl8Va7cG8jtxFVR5IsxpCyTuCuKFr8/edit?usp=sharing" target="_blank" class="presentation-link">Перейти на Google Slides →</a>
          </div>

          <div class="presentation-slide">
            <div class="slide-wrapper">
              <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQL2JdByfSLupNnuJ0QzzIxZJmXeGkx-NjCKAF3hN8f4gPAl9GupITFbeT06Y5KBovCqPwL4AT8m7Wb/pubembed?start=false&loop=false&delayms=1000" 
              frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
            </div>
            <h3>История Российского высшего образования.</h3>
            <p>От академий XVII века до современности</p>
            <a href="https://docs.google.com/presentation/d/1zqdi_zCNhh8TZjaUliNC94rW2D9xOsqIeBb869wVepc/edit?usp=sharing" target="_blank" class="presentation-link">Перейти на Google Slides →</a>
          </div>

          <div class="presentation-slide">
            <div class="slide-wrapper">
              <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSE5hqTvEIj4OF6L2oZJRzEeY7GF2hgjjP6bfX2eS9Pmvo4zePGMiISYIe4z4PImJu2SrFv8OtG8LMr/pubembed?start=false&loop=false&delayms=1000" 
              frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
            </div>
            <h3>Сталинград. 200 дней жизни.</h3>
            <p>Историческая презентация о Сталинградской битве</p>
            <a href="https://docs.google.com/presentation/d/1_IFf__tRejJ3W_x0OUOjDPFIr6gLDwNki1UD4P53KxY/edit?usp=sharing" target="_blank" class="presentation-link">Перейти на Google Slides →</a>
          </div>
        </div>
      </section>
    `;
  }

  renderContacts() {
    return `
      <section id="contacts">
        <h2>Контакты</h2>
          <div class="contacts-container">
              <div class="contact-links">
                <a href="mailto:mail@maxburov.ru" class="contact-link">
                  <div class="contact-icon">✉️</div>
                  <p><strong>Mail</strong></p>
                  <p>mail@maxburov.ru</p>
                </a>
                <a href="https://t.me/friendlymax" class="contact-link" target="_blank">
                  <div class="contact-icon">📱</div>
                  <p><strong>Telegram</strong></p>
                  <p>@friendlymax</p>
                </a>
                <a href="https://github.com/VLGFoxRU" class="contact-link" target="_blank">
                  <div class="contact-icon">🔗</div>
                  <p><strong>GitHub</strong></p>
                  <p>VLGFoxRU</p>
                </a>
              </div>
              <p style="font-size: 14px; color: #666;">Я открыт для сотрудничества. Свяжитесь со мной любым удобным способом!</p>
            </div>

          <div class="contact-form">
            <h3>Форма обратной связи</h3>
            <div class="success-message" id="successMessage">
              ✓ Спасибо! Ваше сообщение успешно отправлено. <br>Я свяжусь с вами в ближайшее время.
            </div>
            <form id="contactForm">
              <div class="form-group">
                <label class="form-label" for="name">Имя *</label>
                <input type="text" id="name" name="name" class="form-control" placeholder="Ваше имя" required>
                <div class="form-error" id="nameError"></div>
              </div>

              <div class="form-group">
                <label class="form-label" for="email">Email *</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="your@email.com" required>
                <div class="form-error" id="emailError"></div>
              </div>

              <div class="form-group">
                <label class="form-label" for="subject">Тема *</label>
                <input type="text" id="subject" name="subject" class="form-control" placeholder="Тема сообщения" required>
                <div class="form-error" id="subjectError"></div>
              </div>

              <div class="form-group">
                <label class="form-label" for="message">Сообщение *</label>
                <textarea id="message" name="message" class="form-control" placeholder="Ваше сообщение" required></textarea>
                <div class="form-error" id="messageError"></div>
              </div>

              <button type="submit" class="submit-btn">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  render404() {
    return `
      <section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1000px; width: 100%; align-items: center;">
          <div style="display: flex; justify-content: center; align-items: center;">
            <video style="max-width: 100%; height: auto; border-radius: var(--radius-lg);" autoplay muted loop>
              <source src="https://media.tenor.com/lx2WSGRk8bcAAAPo/pulp-fiction-john-travolta.mp4" type="video/mp4">
            </video>
          </div>
          
          <div style="text-align: center;">
            <h1 style="font-size: 80px; color: var(--color-primary); margin: 0; font-weight: 700;">404</h1>
            <h2 style="margin: 16px 0 24px; font-size: 32px; color: var(--color-text);">Пу-пу-пууу...</h2>
            <p style="color: var(--color-text-secondary); margin: 0 0 32px; line-height: 1.6; font-size: 16px;">
              К сожалению, запрашиваемая страница не существует.
              Пожалуйста, вернитесь на главную страницу <br>или воспользуйтесь навигацией выше.
            </p>
            <a href="/#/about" class="submit-btn">← Вернуться на главную</a>
          </div>
        </div>
      </section>
      
      <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
    `;
  }

  loadTenorScript() {
    // Загрузить Tenor скрипт для отображения гифок
    if (window.tiktok && window.tiktok.embed) {
      window.tiktok.embed.lib.render(document.body);
    }
  }

  validateContactForm(name, email, subject, message) {
    const errors = {};
    
    if (name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (subject.trim().length < 3) {
      errors.subject = 'Тема должна содержать минимум 3 символа';
    }
    
    if (message.trim().length < 10) {
      errors.message = 'Сообщение должно содержать минимум 10 символов';
    }
    
    return errors;
  }

  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        document.querySelectorAll('.form-error').forEach(el => {
          el.textContent = '';
        });
        
        const errors = this.validateContactForm(name, email, subject, message);
        
        if (Object.keys(errors).length > 0) {
          Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(field + 'Error');
            if (errorElement) {
              errorElement.textContent = errors[field];
            }
          });
          return;
        }
        
        const newMessage = contactDatabase.addMessage(name, email, subject, message);
        
        console.log('✅ Сообщение добавлено в БД:', newMessage);
        console.log('📊 Все сообщения:', contactDatabase.getAllMessages());
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
          successMessage.classList.add('show');
          
          setTimeout(() => {
            successMessage.classList.remove('show');
          }, 5000);
        }
        
        contactForm.reset();
      });
    }
  }

  async loadGitHubProjects() {
    const GITHUB_USER = 'VLGFoxRU';
    const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`;

    try {
      const response = await fetch(REPOS_URL);
      const repos = await response.json();

      const portfolio = document.getElementById('portfolio-grid');

      // Если вдруг элемента нет – выходим
      if (!portfolio) return;

      // Очистим контейнер на случай повторного вызова
      portfolio.innerHTML = '';

      repos.forEach(repo => {
        if (!repo.fork) {
          const card = document.createElement('div');
          card.className = 'portfolio-card';
          card.innerHTML = `
            <div class="portfolio-card-header">
              <h4>${repo.name}</h4>
            </div>
            <div class="portfolio-card-body">
              <p><strong>Описание:</strong> ${repo.description || 'Нет описания'}</p>
              <p><strong>Язык:</strong> ${repo.language || 'Не указан'}</p>
              <p><strong>⭐ Звёзды:</strong> ${repo.stargazers_count}</p>
              <a href="${repo.html_url}" target="_blank">Перейти в репозиторий →</a>
            </div>
          `;
          portfolio.appendChild(card);
        }
      });

      if (portfolio.children.length === 0) {
        portfolio.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Проекты не найдены</p>';
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки проектов:', error);
      const portfolio = document.getElementById('portfolio-grid');
      if (portfolio) {
        portfolio.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Ошибка загрузки проектов</p>';
      }
    }
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
