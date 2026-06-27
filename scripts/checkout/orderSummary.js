import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateCartQuantity,
  updateDeliveryOption
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption,calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary(){


  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingproduct=getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId || '1';
    const deliveryOption=getDeliveryOption(deliveryOptionId);
    const dateString=calculateDeliveryDate(deliveryOption);
    if (matchingproduct) {
      let html = `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingproduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingproduct.image}">

            <div class="cart-item-details">
              <div class="js-product-name-${matchingproduct.id} product-name">
                ${matchingproduct.name}
              </div>
              <div class="product-price">
                $${matchingproduct.getPrice()}
              </div>
              <div class="js-product-quantity-${matchingproduct.id} product-quantity">
                <span>
                  Quantity: <span class="js-quantity-label-${matchingproduct.id} quantity-label">${cartItem.Quantity}</span>
                </span>
                <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${matchingproduct.id}">
                  Update
                </span>
                <input class="js-quantity-input-${matchingproduct.id} quantity-input"data-product-id="${matchingproduct.id}">
                <span class="save-quantity-link link-primary" data-product-id="${matchingproduct.id}">Save</span>
                <span class="js-delete-link-${matchingproduct.id} js-delete-link delete-quantity-link link-primary" data-product-id="${matchingproduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="js-delivery-options delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
                ${deliveryOptionsHTML(matchingproduct,cartItem)}
                
            </div>
          </div>
        </div>
      `;

      cartSummaryHTML += html;
    }
  });

  function deliveryOptionsHTML(matchingproduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString=calculateDeliveryDate(deliveryOption);
      const priceString=deliveryOption.priceCents===0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      html+=` <div class="delivery-option js-delivery-option js-delivery-option-${matchingproduct.id}-${deliveryOption.id}" data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" 
                ${isChecked ? 'checked': ''}
                class="delivery-option-input js-delivery-option-input-${matchingproduct.id}-${deliveryOption.id}" name="delivery-option-${matchingproduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>`
    });
    return html;
  }

  const orderSummaryEl = document.querySelector('.js-order-summary');
  if (orderSummaryEl) {
    orderSummaryEl.innerHTML = cartSummaryHTML;
  }

function updateCartDisplayQuantity(){
    const cartQuantity = calculateCartQuantity();

    const linkEl = document.querySelector('.js-return-to-home-link');
    if (linkEl) {
      linkEl.innerHTML = cartQuantity;
    }
  }

  updateCartDisplayQuantity();


  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderPaymentSummary();
        updateCartDisplayQuantity();

        renderOrderSummary();
      });
    });

    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity')
        });
      });
    
  document.querySelectorAll('.save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        editQuantity(link);
    })
  });


      document.querySelectorAll('.quantity-input')
        .forEach((link)=>{
          link.addEventListener('keydown', (event)=>{
          if (event.key==='Enter'){
            editQuantity(link);
          }
        })
      })
  function editQuantity(link){
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);
        
        if (newQuantity > 0 && newQuantity <= 1000) {
          updateQuantity(productId, newQuantity);
          updateCartDisplayQuantity();
          updateCartQuantity();
          renderPaymentSummary();
          renderOrderSummary();
        }
        if (container) container.classList.remove('is-editing-quantity');
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>
      {
        const{productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
    
}
