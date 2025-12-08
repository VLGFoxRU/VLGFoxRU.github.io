// Активная ссылка в меню
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id !== 'about') {
        observer.observe(section);
    }
});

// Клик на логотип - переход на блок "Обо мне"
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});
logo.style.cursor = 'pointer';

// Загрузка проектов с GitHub
const GITHUB_USER = 'VLGFoxRU';
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`;

async function loadGitHubProjects() {
    try {
        const response = await fetch(REPOS_URL);
        const repos = await response.json();

        const portfolio = document.getElementById('portfolio-grid');
        const loading = document.getElementById('loading');
        loading.style.display = 'none';

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
        console.error('Ошибка загрузки проектов:', error);
        document.getElementById('loading').textContent = 'Ошибка загрузки проектов';
    }
}

loadGitHubProjects();
