export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  if(!cart){
    cart=[{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      Quantity:1,
      deliveryOptionId:'2'
    }]
  }
}

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
  if (!matchingitem){
    return;
  }
  if(deliveryOptionId==='1' || deliveryOptionId==='2'|| deliveryOptionId==='3'){
    matchingitem.deliveryOptionId= deliveryOptionId;
  }
  else{
    return;
  }
  

  saveToStorage();
}