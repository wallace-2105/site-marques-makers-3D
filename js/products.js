/* ============================================================
   products.js — Dados dos Produtos
   ============================================================
   
   COMO EDITAR:
   - Para ADICIONAR um produto, copie um objeto do array e 
     altere os campos.
   - Para REMOVER, delete o objeto correspondente.
   - O campo "paymentLink" é OPCIONAL:
       • Se preenchido (ex: "https://mpago.la/seu-link"), o carrinho
         mostrará um botão extra "Pagar agora" para esse item.
       • Se vazio (""), apenas o botão "Fechar pedido pelo WhatsApp"
         será exibido — o pagamento é feito pelo vendedor no WhatsApp.
   
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: 'Miniatura Personalizada',
    description: 'Miniaturas 3D para presentes.',
    price: 59.90,
    image: 'assets/img/25078gg.webp',
    badge: 'Pronta Entrega',
    // TODO: Preencha com o link de pagamento (Mercado Pago, PagSeguro, etc.)
    // Exemplo: 'https://mpago.la/seu-link-aqui'
    paymentLink: ''
  },
  {
    id: 2,
    name: 'Suporte para Vinho',
    description: 'Suporte para vinho em diversos ângulos.',
    price: 49.90,
    image: 'assets/img/D_NQ_NP_778942-MLB70005097797_062023-O.webp',
    badge: 'Pronta Entrega',
    paymentLink: ''
  },
  {
    id: 3,
    name: 'Chaveiro Personalizado',
    description: 'Chaveiro 3D com seu nome, logo ou design exclusivo.',
    price: 24.90,
    image: 'assets/img/Chaveiro-3D-para-Impressao-Personalizado.webp',
    badge: 'Pronta Entrega',
    paymentLink: ''
  },
  {
    id: 4,
    name: 'Bonecos Geek',
    description: 'Bonecos geek para sua coleção.',
    price: 34.99,
    image: 'assets/img/whatsapp-image-2025-01-23-at-12-17-48-62dc59daae839583cd17376460810417-480-0.jpeg',
    badge: 'Pronta Entrega',
    paymentLink: ''
  }
];
