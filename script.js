// Efeito de scroll suave já está no CSS, mas aqui adicionamos mais funcionalidades

// 1. Detectar quando os elementos entram na viewport e animar
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar cards quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.feature-card, .project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});

// 2. Adicionar classe ativa ao navbar ao fazer scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
  }
});

// 3. Adicionar ripple effect aos botões
document.querySelectorAll('.btn-primary, .contact-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// 4. Highlight do link ativo no navbar
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function() {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.opacity = '0.7';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.opacity = '1';
      link.style.borderBottom = '2px solid #10b981';
      link.style.paddingBottom = '5px';
    } else {
      link.style.borderBottom = 'none';
      link.style.paddingBottom = '0';
    }
  });
});

// 5. Contador simples para animar números
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

console.log('✅ Site carregado com sucesso!');