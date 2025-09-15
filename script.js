document.getElementById('year').textContent=new Date().getFullYear();

// Accordion
document.querySelectorAll('.acc-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.classList.toggle('active');
    let panel=btn.nextElementSibling;
    panel.style.display=panel.style.display==='block'?'none':'block';
  });
});

// Copiar telefone
document.getElementById('copyPhone').addEventListener('click',()=>{
  let phone=document.getElementById('phoneDisplay').textContent;
  navigator.clipboard.writeText(phone);
  alert('Telefone copiado: '+phone);
});

// Imóveis demo
const imoveis=[
  {tipo:'apartamento',bairro:'Centro',img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',desc:'Apartamento moderno no Centro'},
  {tipo:'casa',bairro:'Jardins',img:'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600',desc:'Casa ampla nos Jardins'},
  {tipo:'comercial',bairro:'Paulista',img:'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600',desc:'Sala comercial na Paulista'}
];

function renderCards(){
  const tipo=document.getElementById('tipoFilter').value;
  const search=document.getElementById('searchInput').value.toLowerCase();
  const cards=document.getElementById('cards');
  cards.innerHTML='';
  imoveis.filter(i=>(tipo==='all'||i.tipo===tipo)&&i.bairro.toLowerCase().includes(search))
  .forEach(i=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<img src="${i.img}"><div class="card-body"><h4>${i.desc}</h4><p>${i.bairro}</p></div>`;
    cards.appendChild(card);
  });
}
document.getElementById('tipoFilter').addEventListener('change',renderCards);
document.getElementById('searchInput').addEventListener('input',renderCards);
renderCards();

// Galeria demo
const galeriaImgs=[
  'https://images.unsplash.com/photo-1600585154207-6d18a0adbb55?w=600',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600'
];
const thumbs=document.getElementById('thumbs');
galeriaImgs.forEach(src=>{
  const img=document.createElement('img');
  img.src=src;
  img.addEventListener('click',()=>window.open(src,'_blank'));
  thumbs.appendChild(img);
});