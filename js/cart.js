/* ============================================================
   cart.js — Lógica do Carrinho de Compras
   ============================================================
   Persiste no localStorage. Renderiza no drawer lateral.
   ============================================================ */

const Cart = {
  KEY: 'mm3d_cart',
  items: [], // Array of { productId: number, quantity: number }

  /**
   * Carrega o carrinho do localStorage.
   */
  load() {
    try {
      const saved = localStorage.getItem(this.KEY);
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.items = [];
    }
  },

  /**
   * Salva o carrinho no localStorage.
   */
  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.items));
  },

  /**
   * Adiciona um produto ao carrinho (ou incrementa se já existe).
   * @param {number} productId
   */
  addItem(productId) {
    const existing = this.items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ productId, quantity: 1 });
    }
    this.save();
    this.render();
  },

  /**
   * Remove um produto do carrinho completamente.
   * @param {number} productId
   */
  removeItem(productId) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.save();
    this.render();
  },

  /**
   * Atualiza a quantidade de um item. Remove se qty <= 0.
   * @param {number} productId
   * @param {number} qty
   */
  updateQuantity(productId, qty) {
    if (qty <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = qty;
      this.save();
      this.render();
    }
  },

  /**
   * Retorna o total de itens no carrinho.
   * @returns {number}
   */
  getCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  /**
   * Retorna o valor total do carrinho.
   * @returns {number}
   */
  getTotal() {
    return this.items.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  /**
   * Retorna array de { product, quantity } para uso no checkout.
   * @returns {Array}
   */
  getItemsWithProducts() {
    return this.items
      .map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  },

  /**
   * Atualiza o badge do header e o conteúdo do drawer.
   */
  render() {
    this.renderBadge();
    this.renderDrawer();
  },

  /**
   * Atualiza o contador no ícone do carrinho.
   */
  renderBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const count = this.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';

    // Trigger bounce animation
    const cartIcon = document.getElementById('cart-toggle');
    if (cartIcon) {
      cartIcon.classList.remove('cart-bounce');
      // Force reflow to restart animation
      void cartIcon.offsetWidth;
      cartIcon.classList.add('cart-bounce');
    }
  },

  /**
   * Renderiza o conteúdo do drawer do carrinho.
   */
  renderDrawer() {
    const body = document.getElementById('cart-drawer-body');
    const footer = document.getElementById('cart-drawer-footer');
    if (!body || !footer) return;

    const itemsWithProducts = this.getItemsWithProducts();

    // Empty cart state
    if (itemsWithProducts.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Seu carrinho está vazio</p>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    // Render items
    body.innerHTML = itemsWithProducts.map(({ product, quantity }) => {
      const subtotal = product.price * quantity;
      const paymentBtn = product.paymentLink
        ? `<a href="${product.paymentLink}" target="_blank" rel="noopener noreferrer" class="btn-pay-now">
             <i class="fas fa-credit-card"></i> Pagar agora
           </a>`
        : '';

      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">${formatCurrency(subtotal)}</div>
            ${paymentBtn}
          </div>
          <div class="cart-item-qty">
            <button onclick="Cart.updateQuantity(${product.id}, ${quantity - 1})" aria-label="Diminuir">−</button>
            <span>${quantity}</span>
            <button onclick="Cart.updateQuantity(${product.id}, ${quantity + 1})" aria-label="Aumentar">+</button>
          </div>
          <button class="cart-item-remove" onclick="Cart.removeItem(${product.id})" aria-label="Remover">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    }).join('');

    // Render footer with total + checkout button
    footer.innerHTML = `
      <div class="cart-total">
        <span>Total</span>
        <span class="cart-total-value">${formatCurrency(this.getTotal())}</span>
      </div>
      <button class="btn-whatsapp-checkout" onclick="Cart.checkout()">
        <i class="fab fa-whatsapp"></i>
        Fechar pedido pelo WhatsApp
      </button>
    `;
  },

  /**
   * Abre o checkout via WhatsApp.
   */
  checkout() {
    const items = this.getItemsWithProducts();
    if (items.length === 0) return;
    openWhatsAppCheckout(items);
  },

  /**
   * Abre o drawer do carrinho.
   */
  openDrawer() {
    document.getElementById('cart-overlay')?.classList.add('open');
    document.getElementById('cart-drawer')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  /**
   * Fecha o drawer do carrinho.
   */
  closeDrawer() {
    document.getElementById('cart-overlay')?.classList.remove('open');
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.body.style.overflow = '';
  }
};
