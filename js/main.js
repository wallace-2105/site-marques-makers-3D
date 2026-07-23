/* ============================================================
   main.js — Inicialização Geral, UI e Interações
   ============================================================
   - Renderiza cards de produto dinamicamente
   - Menu mobile funcional
   - FAQ accordion
   - Scroll suave
   - Scroll reveal (IntersectionObserver)
   - Toast notifications
   - Formulários → WhatsApp
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProducts();
  initCart();
  initMobileMenu();
  initFAQ();
  initSmoothScroll();
  initScrollReveal();
  initQuoteForm();
  initContactForm();
});

/* ============================================================
   RENDER PRODUCTS
   ============================================================ */
function initProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((product, index) => {
    const badgeHTML = product.badge
      ? `<span class="absolute top-3 right-3 badge-glow">${product.badge}</span>`
      : '';

    return `
      <div class="product-card-wrapper scroll-reveal scroll-reveal-delay-${index + 1}">
        <div class="bg-white product-card shadow-md">
          <div class="relative product-img-wrapper">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${badgeHTML}
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-1" style="font-family: var(--font-display)">${product.name}</h3>
            <p class="text-gray-500 text-sm mb-4">${product.description}</p>
            <div class="flex justify-between items-center">
              <span class="font-bold text-indigo-600 text-lg">${formatCurrency(product.price)}</span>
              <button
                class="btn-buy bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-300"
                data-product-id="${product.id}"
                onclick="handleAddToCart(this, ${product.id})"
              >
                <i class="fas fa-shopping-cart mr-1"></i> Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Handler do botão "Comprar" — adiciona ao carrinho com animação.
 * @param {HTMLElement} btn 
 * @param {number} productId 
 */
function handleAddToCart(btn, productId) {
  Cart.addItem(productId);

  // Animate button → "Adicionado ✓"
  const originalHTML = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<i class="fas fa-check mr-1"></i> Adicionado';

  // Show toast
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    showToast(`${product.name} adicionado ao carrinho!`);
  }

  // Reset button after 1.5s
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = originalHTML;
  }, 1500);
}

/* ============================================================
   CART INIT
   ============================================================ */
function initCart() {
  Cart.load();
  Cart.render();

  // Toggle drawer
  const toggle = document.getElementById('cart-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      Cart.openDrawer();
    });
  }

  // Close drawer via overlay
  const overlay = document.getElementById('cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => Cart.closeDrawer());
  }

  // Close drawer via X button
  const closeBtn = document.getElementById('cart-drawer-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => Cart.closeDrawer());
  }
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');

  if (!openBtn || !closeBtn || !menu) return;

  openBtn.addEventListener('click', () => {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');

      const isOpen = answer.classList.contains('open');

      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');

      // Toggle current
      if (!isOpen) {
        answer.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // skip bare "#" links

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe after a short delay to ensure dynamic content is rendered
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }, 100);
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;

  container.appendChild(toast);

  // Trigger show animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ============================================================
   QUOTE FORM → WhatsApp
   ============================================================ */
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      project: document.getElementById('project')?.value || '',
      material: document.getElementById('material')?.value || ''
    };

    // Show success toast
    showToast('Redirecionando para o WhatsApp...');

    // Small delay so user sees the toast
    setTimeout(() => {
      openWhatsAppQuote(formData);
    }, 500);

    form.reset();
  });
}

/* ============================================================
   CONTACT FORM → WhatsApp
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('contact-name')?.value || '',
      email: document.getElementById('contact-email')?.value || '',
      subject: document.getElementById('contact-subject')?.value || '',
      message: document.getElementById('contact-message')?.value || ''
    };

    showToast('Redirecionando para o WhatsApp...');

    setTimeout(() => {
      openWhatsAppContact(formData);
    }, 500);

    form.reset();
  });
}
