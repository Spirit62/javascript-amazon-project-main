export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, StrQuan) {
  let matchingitem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
  });

  if (matchingitem) {
    matchingitem.Quantity += Number(StrQuan);
  } else {
    cart.push({
      productId,
      Quantity: Number(StrQuan),
      deliveryOptionId:'1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.Quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem)=>{
  if (cartItem.productId === productId){
    cartItem.Quantity = newQuantity;
  }
  });
  saveToStorage();
}
export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  const cartQuantityEl = document.querySelector('.js-cart-quantity');
  if (cartQuantityEl) {
    cartQuantityEl.innerHTML = cartQuantity;
  }

  const linkEl = document.querySelector('.js-return-to-home-link');
  if (linkEl) {
    linkEl.innerHTML = `${cartQuantity} items`;
  }
}

export function updateDeliveryOption(productId, deliveryOptionId){
   let matchingitem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
  });

  matchingitem.deliveryOptionId= deliveryOptionId;

  saveToStorage();
}