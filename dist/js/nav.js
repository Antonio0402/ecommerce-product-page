const links = document.querySelector('.header__links');
const menuBtn = document.querySelector('.header__menu');
const nav = document.querySelector('.nav');

function toggleMenu({currentTarget}) {
  const expanded = currentTarget.getAttribute('aria-expanded') === 'true' || false;
  const visiblity = links.getAttribute('data-visible') === 'true' || false;

  currentTarget.setAttribute('aria-expanded', !expanded);
  links.setAttribute('data-visible', !visiblity);
}

menuBtn.addEventListener('click', toggleMenu);
// nav.addEventListener('click', (e) => {
//  e.currentTarget === e.target
// });

