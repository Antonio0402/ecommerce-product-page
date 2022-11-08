const amtBtn = document.querySelectorAll('.icon-btn');
const qty = document.querySelector('.qty');
const notif = document.querySelector('.header__notif');
const notifQty = notif.firstElementChild;
const cart = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__container');
const cartBtn = document.querySelector('.header__cart');
const checkoutBtn = document.querySelector('#checkout');

let amount = 0;

const checkOutState = {
  'default': 
  `<p class="cart__header fw-700 letter-spacing-2">Cart</p>
  <div></div>
  <p class="cart__empty flex text-dark-grayish-blue fw-700">Your cart is empty</p>
  <div></div>`,
  'items':
  `<p class="cart__header fw-700 letter-spacing-2">Cart</p>
  <ul class="cart__modal flex flex--col">
    <li class="cart__items flex flex--jc-sb">
        <div class="item flex flex--ai-ct">
          <div>
            <img class="item__img" src="images/image-product-1-thumbnail.jpg" alt="shoes image-product-1">
          </div>
          <div class="item grid" style="--gap: 0.5rem;">
            <p class="item__name text-black letter-spacing-1" style="text-overflow: ellipsis;">Fall Limited Edition Sneakers</p>
            <p class="item__qty flex" style="--gap: 0.25rem;">
              <span id="item__price"></span>
              <span>&times;</span>
              <span id="item__amount"></span>
              <span id="item__total" class=" fw-700"></span>
            </p>
          </div>
        </div>
        <button class="trash icon-btn" aria-label="Remove product from cart">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <path
                d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                id="a" />
            </defs>
            <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
          </svg>
        </button>
  </li>
  </ul>
  <button class="cart__checkout btn btn--checkout"><span>Checkout</span>
  </button>`

};

function handleAmt(e) {
  if(e.currentTarget.id === 'decrease') {
    amount === 0 ? e.currentTarget : --amount;
  } else if(e.currentTarget.id === 'increase') {
    ++amount;
  }
  qty.textContent = amount;
  if(amount === 0) {
    e.currentTarget.setAttribute('disabled', true);
  } else {
    document.getElementById('decrease').removeAttribute('disabled');
  }
}

function toggleCart({currentTarget}) {
  
  const visiblity = cart.getAttribute('data-visible') === 'true' || false;
  cart.setAttribute('data-visible', !visiblity);
}

function handleCheckOut(e) {
  if(amount === 0) {
    cartContainer.innerHTML = checkOutState.default;
    notif.style.visibility = 'hidden';
  } else {
    cartContainer.innerHTML = checkOutState.items;
    const price = document.getElementById('item__price');
    price.textContent = document.querySelector('.price').textContent;
    const itemAmount = document.getElementById('item__amount');
    itemAmount.textContent = amount;
    const total = document.getElementById('item__total');
    total.textContent = `$${Number.parseInt(document.querySelector('.price').textContent.match(/\d+.*/gi)[0]) * amount}.00`;
    notif.style.visibility = 'visible';
    notifQty.textContent = amount;
  }

  const trash = document.querySelector('.trash');
  trash.addEventListener('click', (e) => {
    cartContainer.innerHTML = checkOutState.default;
    notif.style.visibility = 'hidden';
  });
}

amtBtn.forEach(amt => amt.addEventListener('click', handleAmt));
cartBtn.querySelector('svg').addEventListener('click', toggleCart);
checkoutBtn.addEventListener('click', handleCheckOut);

