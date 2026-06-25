import {renderOrderSummary} from '../../../scripts/checkout/orderSummary.js'
import {cart, loadFromStorage} from '../../../data/cart.js'
import { renderPaymentSummary } from '../../../scripts/checkout/paymentSummary.js'
describe ('test suite: renderOrderSummart',()=>{

  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d'

  
  beforeEach(()=>{
    
      document.querySelector('.js-test-container')
      .innerHTML='<div class="js-order-summary"></div> <div class="js-payment-summary"></div>';
     spyOn(localStorage, 'getItem').and.callFake(()=>{
    
    
        return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      Quantity:1,
      deliveryOptionId:'2'
    }]
          
        );
        });
        loadFromStorage();

        renderOrderSummary();
  })

  afterEach(()=>{
     document.querySelector('.js-test-container')
      .innerHTML='';
  })

  it('displays the cart',()=>{
    
  expect (
    document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(2)
  expect(document.querySelector(`.js-product-quantity-${productId1}`)
    .innerText
  ).toContain('Quantity: 2')
  expect(document.querySelector(`.js-product-quantity-${productId2}`)
    .innerText
  ).toContain('Quantity: 1')
  expect(document.querySelector(`.js-product-name-${productId1}`)
    .textContent.trim()).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs')


 
  });

  it('removes a product',()=>{
    document.querySelector(`.js-delete-link-${productId1}`).click();

   expect (
    document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(1)
  expect(
    document.querySelector(`.js-cart-item-container-${productId1}`)
  ).toEqual(null);
  expect(
    document.querySelector(`.js-cart-item-container-${productId2}`)
  ).not.toEqual(null);
  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual(productId2);
  expect(document.querySelector(`.js-product-name-${productId2}`)
    .textContent.trim()).toEqual('Intermediate Size Basketball')
  })

  it('updates the delivery option',()=>{
    const option = document.querySelector(`.js-delivery-option-${productId1}-3`)
    option.click();
    const input= document.querySelector(`.js-delivery-option-input-${productId1}-3`)
    expect(input.checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    renderPaymentSummary();
    expect(document.querySelector('.js-shipping-price').innerHTML).toEqual('$14.98');
    expect(document.querySelector('.js-total-price').innerHTML).toEqual('$63.50')
  })

})