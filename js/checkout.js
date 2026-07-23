/* ============================================================
   checkout.js — Fechamento de Venda via WhatsApp
   ============================================================

   COMO CONFIGURAR:
   ─────────────────
   1. Troque o número de WhatsApp abaixo (WHATSAPP_NUMBER) pelo
      número real da loja, no formato: código do país + DDD + número.
      Exemplo: '5511948947933' → Brasil (55) + SP (11) + número.

   2. Para links de pagamento por produto, edite o campo 
      "paymentLink" em js/products.js.

   ============================================================ */

// ⚠️ TROCAR AQUI: número do WhatsApp da loja (sem +, sem espaços)
const WHATSAPP_NUMBER = '5511948947933';

/**
 * Formata um valor numérico como moeda brasileira.
 * @param {number} value 
 * @returns {string} Ex: "R$ 59,90"
 */
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Monta a mensagem de texto para o pedido do carrinho.
 * @param {Array} cartItems - Array de { product, quantity }
 * @returns {string} Mensagem formatada
 */
function buildWhatsAppMessage(cartItems) {
  let message = '🛒 *Novo Pedido — Marques Makers 3D*\n';
  message += '━━━━━━━━━━━━━━━━━━━━\n\n';

  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.product.price * item.quantity;
    total += subtotal;
    message += `*${index + 1}. ${item.product.name}*\n`;
    message += `   Qtd: ${item.quantity} × ${formatCurrency(item.product.price)}\n`;
    message += `   Subtotal: ${formatCurrency(subtotal)}\n\n`;
  });

  message += '━━━━━━━━━━━━━━━━━━━━\n';
  message += `*💰 TOTAL: ${formatCurrency(total)}*\n\n`;
  message += 'Olá! Gostaria de fechar este pedido. 😊';

  return message;
}

/**
 * Abre o WhatsApp Web/App com a mensagem do pedido.
 * @param {Array} cartItems - Array de { product, quantity }
 */
function openWhatsAppCheckout(cartItems) {
  if (!cartItems || cartItems.length === 0) return;

  const message = buildWhatsAppMessage(cartItems);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Monta mensagem de orçamento a partir do formulário.
 * @param {Object} formData - { name, email, phone, project, material }
 * @returns {string} Mensagem formatada
 */
function buildQuoteMessage(formData) {
  let message = '📋 *Solicitação de Orçamento — Marques Makers 3D*\n';
  message += '━━━━━━━━━━━━━━━━━━━━\n\n';
  message += `*Nome:* ${formData.name}\n`;
  message += `*E-mail:* ${formData.email}\n`;
  message += `*Telefone:* ${formData.phone}\n`;
  message += `*Material:* ${formData.material || 'Não especificado'}\n\n`;
  message += `*Descrição do Projeto:*\n${formData.project}\n\n`;
  message += '━━━━━━━━━━━━━━━━━━━━\n';
  message += 'Gostaria de receber um orçamento para este projeto. 😊';

  return message;
}

/**
 * Abre o WhatsApp com mensagem de orçamento.
 * @param {Object} formData
 */
function openWhatsAppQuote(formData) {
  const message = buildQuoteMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Monta mensagem de contato rápido.
 * @param {Object} formData - { name, email, subject, message }
 */
function openWhatsAppContact(formData) {
  let message = '💬 *Mensagem de Contato — Marques Makers 3D*\n';
  message += '━━━━━━━━━━━━━━━━━━━━\n\n';
  message += `*Nome:* ${formData.name}\n`;
  message += `*E-mail:* ${formData.email}\n`;
  message += `*Assunto:* ${formData.subject}\n\n`;
  message += `*Mensagem:*\n${formData.message}\n`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}
