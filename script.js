// Dados de exemplo de imóveis e galeria (troque para seus próprios)
const IMOVEIS = [
  { id:1, tipo:'apartamento', titulo:'Apto 2 quartos - Pinheiros', preco:'R$ 620.000', img:'https://images.unsplash.com/photo-1560184897-6b2e4c7f3c39?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1d9e3f2e3b4d7a0b0a1f2c3d4e5f6a7b', bairro:'Pinheiros' },
  { id:2, tipo:'casa', titulo:'Casa com quintal - Vila Madalena', preco:'R$ 1.250.000', img:'https://images.unsplash.com/photo-1572120360610-d971b9b3a0c3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a3b4c5d6e7f8g9h0i1j2k3l4m', bairro:'Vila Madalena' },
  { id:3, tipo:'comercial', titulo:'Sala comercial - Centro', preco:'R$ 350.000', img:'https://images.unsplash.com/photo-1556740720-5785c873187f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b4c5d6e7f8g9h0i1j2k3l4m5n', bairro:'Centro' },
  { id:4, tipo:'apartamento', titulo:'Apto studio - Bela Vista', preco:'R$ 430.000', img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c5d6e7f8g9h0i1j2k3l4m5n6o', bairro:'Bela Vista' }
];

// galeria (pode usar mesmas imagens)
const GALLERY = [
  {src:IMOVEIS[0].img, alt: IMOVEIS[0].titulo},
  {src:IMOVEIS[1].img, alt: IMOVEIS[1].titulo},
  {src:IMOVEIS[2].img, alt: IMOVEIS[2].titulo},
  {src:IMOVEIS[3].img, alt: IMOVEIS[3].titulo},
];

// Inserir ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// --------- Accordion serviços -----------
document.querySelectorAll('.acc-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panel = btn.nextElementSibling;
    const open = btn.classList.toggle('open');
    panel.style.display = open ? 'block' : 'none';
    btn.querySelector('.chev').textContent = open ? '▾' : '▸';
  });
});

// --------- Gerar cards de imóveis -----------
const cardsEl = document.getElementById('cards');

function createCard(item){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${item.img}" alt="${item.titulo}">
    <div class="card-body">
      <h4>${item.titulo}</h4>
      <div>${item.bairro}</div>
      <div class="badge">${item.tipo.toUpperCase()} • ${item.preco}</div>
    </div>
  `;
  div.addEventListener('click', ()=>openModal(item.img, item.titulo));
  return div;
}

function renderCards(list){
  cardsEl.innerHTML = '';
  list.forEach(i=>cardsEl.appendChild(createCard(i)));
}
renderCards(IMOVEIS);

// filtros
const tipoFilter = document.getElementById('tipoFilter');
const searchInput = document.getElementById('searchInput');

function applyFilters(){
  const tipo = tipoFilter.value;
  const q = searchInput.value.trim().toLowerCase();
  const filtered = IMOVEIS.filter(i=>{
    const matchTipo = tipo === 'all' ? true : i.tipo === tipo;
    const matchQ = q === '' ? true : (i.bairro.toLowerCase().includes(q) || i.titulo.toLowerCase().includes(q));
    return matchTipo && matchQ;
  });
  renderCards(filtered);
}

tipoFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// --------- Galeria de miniaturas -----------
const thumbs = document.getElementById('thumbs');
GALLERY.forEach(g=>{
  const d = document.createElement('div');
  d.className = 'thumb';
  d.innerHTML = `<img src="${g.src}" alt="${g.alt}">`;
  d.addEventListener('click', ()=>openModal(g.src, g.alt));
  thumbs.appendChild(d);
});

// --------- Modal de imagem -----------
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

function openModal(src, caption){
  modalImg.src = src;
  modalCaption.textContent = caption || '';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

// --------- Formulário (validação simples) -----------
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const tel = document.getElementById('telefone').value.trim();
  const msg = document.getElementById('mensagem').value.trim();

  if(!nome || !email || !tel || !msg){
    alert('Por favor preencha todos os campos.');
    return;
  }

  // Aqui você integraria com um backend ou serviço de formulário
  alert('Mensagem enviada! Obrigado — responderemos em breve.');
  form.reset();
});

// --------- Copiar telefone -----------
function copyPhone(phoneString){
  navigator.clipboard?.writeText(phoneString).then(()=>{
    alert('Telefone copiado para a área de transferência: ' + phoneString);
  }).catch(()=>{
    prompt('Copie o telefone manualmente:', phoneString);
  });
}

document.getElementById('copy-phone').addEventListener('click', ()=>{
  copyPhone('(11) 9 9999-9999');
});
document.getElementById('copyPhone2').addEventListener('click', ()=>{
  copyPhone('(11) 9 9999-9999');
});

// feito
