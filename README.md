# Marques Makers 3D

Site institucional e vitrine de produtos da **Marques Makers 3D**, loja especializada em impressão 3D personalizada (miniaturas, chaveiros, suportes, peças técnicas e presentes). O site funciona como catálogo + carrinho, e o fechamento da venda é feito via WhatsApp — sem gateway de pagamento embutido.

🔗 **Demo:** https://wallace-2105.github.io/site-marques-makers-3D/


---

## ✨ Funcionalidades

- Catálogo de produtos com efeitos visuais (hover, zoom, scroll reveal)
- Carrinho de compras funcional, com persistência em `localStorage`
- Fechamento de pedido automático via WhatsApp (mensagem pré-formatada com os itens e total)
- Suporte a link de pagamento individual por produto (opcional)
- Formulário de orçamento e contato
- Redes sociais com links reais (abre o app nativo quando instalado)
- Menu mobile funcional
- FAQ em accordion

---

## 🛠️ Tecnologias

- HTML5
- CSS3 (+ [Tailwind CSS](https://tailwindcss.com/) via CDN)
- JavaScript (vanilla, sem frameworks)
- [Font Awesome](https://fontawesome.com/) para ícones

Sem build step, sem dependências de instalação — é um site 100% estático.

---

## 📁 Estrutura do projeto

```
/
├── index.html
├── css/
│   └── style.css        # estilos customizados (além do Tailwind)
├── js/
│   ├── products.js       # dados dos produtos (nome, preço, imagem, link de pagamento opcional)
│   ├── cart.js           # lógica do carrinho (adicionar, remover, persistência)
│   ├── checkout.js       # geração da mensagem e link do WhatsApp
│   └── main.js           # menu mobile, FAQ, scroll suave, inicialização
└── assets/
    └── img/              # imagens dos produtos e do site
```

---

## ▶️ Como rodar localmente

Não precisa de instalação — só de um servidor local simples para evitar problemas com módulos/paths relativos.

**Com Python:**
```bash
python3 -m http.server 8000
```
Acesse: `http://localhost:8000`

**Com Node.js:**
```bash
npx serve .
```

**Com VS Code:**
Instale a extensão **Live Server** e clique em "Open with Live Server" no `index.html`.

---

## ⚙️ Configuração antes de publicar

Antes de colocar no ar, ajuste estes pontos:

| O que configurar | Onde |
|---|---|
| Número de WhatsApp para receber pedidos | `js/checkout.js` |
| Link de pagamento por produto (opcional) | `js/products.js` → campo `paymentLink` |
| Links reais de Instagram, Facebook, YouTube | `index.html` (seção de contato e footer) |
| Endereço e telefone de contato | `index.html` (seção de contato) |

---

## 🛒 Como funciona o fluxo de compra

1. Cliente adiciona produtos ao carrinho pelo botão **"Comprar"**.
2. Ao abrir o carrinho, clica em **"Fechar pedido pelo WhatsApp"**.
3. O site monta automaticamente uma mensagem com os itens, quantidades e valor total, e abre o WhatsApp já com o texto pronto.
4. O vendedor confirma o pedido e envia o link de pagamento (Pix, Mercado Pago, etc.) diretamente na conversa.

Se um produto tiver `paymentLink` preenchido em `js/products.js`, aparece também um botão de pagamento direto para aquele item.

---

## 📄 Licença

Projeto de uso próprio da Marques Makers 3D. Todos os direitos reservados.
