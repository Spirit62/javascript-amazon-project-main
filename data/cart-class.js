class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems || this.cartItems.length === 0) {
      this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          Quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          Quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, StrQuan) {
    let matchingitem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });

    if (matchingitem) {
      matchingitem.Quantity += Number(StrQuan);
    } else {
      this.cartItems.push({
        productId,
        Quantity: Number(StrQuan),
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.Quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.Quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  updateCartQuantity() {
    const cartQuantity = this.calculateCartQuantity();

    const cartQuantityEl = document.querySelector('.js-cart-quantity');
    if (cartQuantityEl) {
      cartQuantityEl.innerHTML = cartQuantity;
    }

    const linkEl = document.querySelector('.js-return-to-home-link');
    if (linkEl) {
      linkEl.innerHTML = `${cartQuantity} items`;
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });
    if (!matchingitem) {
      return;
    }
    if (deliveryOptionId === '1' || deliveryOptionId === '2' || deliveryOptionId === '3') {
      matchingitem.deliveryOptionId = deliveryOptionId;
    } else {
      return;
    }

    this.saveToStorage();
  }
}


const cart = new Cart('cart-oop');
const business_cart = new Cart('cart-business');

console.log(cart);
console.log(business_cart);