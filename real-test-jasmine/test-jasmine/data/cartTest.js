import {addToCart, cart, loadFromStorage,removeFromCart} from '../../../data/cart.js'
import { updateDeliveryOption } from '../../../data/cart.js';
beforeEach(()=>{
  spyOn(localStorage, 'setItem');
})
describe('test suit add to cart',()=>{
  it('adds an existing product to the cart',()=>
  {

    spyOn(localStorage, 'getItem').and.callFake(()=>{


    return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity:1,
      deliveryOptionId:'1'
    }
      
    ]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].Quantity).toEqual(2);
  });
  it('adds a new product to the cart',()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();


    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].Quantity).toEqual(1);
  })
});

describe('test suit remove from cart',()=>{
const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d'
it('removes a productId in the cart',()=>{
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    
    
    return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      Quantity:1,
      deliveryOptionId:'2'
    }])
});

loadFromStorage();
  removeFromCart(productId1);
  expect(cart.length).toEqual(1)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
})
it('removes a productId not in the cart',()=>{
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    
    
    return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      Quantity:1,
      deliveryOptionId:'2'
    }])
});
  loadFromStorage();
  removeFromCart('dqididbiqud');
  expect(cart.length).toEqual(2)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
})

describe('test suite updateDeliveryOption', () => {
  
  it('update the delivery option of a product in cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', Quantity: 2, deliveryOptionId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', Quantity: 1, deliveryOptionId: '2' }
      ]);
    });
    loadFromStorage();
    updateDeliveryOption(productId1, '3');
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  
  it('checks if localstorage is altered when product not in cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', Quantity: 2, deliveryOptionId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', Quantity: 1, deliveryOptionId: '2' }
      ]);
    });
    loadFromStorage();
    updateDeliveryOption('wkebciwwefiwe', '3');
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('checks if localstorage is altered when wrong deliveryId is given',()=>{
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', Quantity: 2, deliveryOptionId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', Quantity: 1, deliveryOptionId: '2' }
      ]);
    });
    loadFromStorage();
    updateDeliveryOption(productId1, '4');
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(cart));
  })

}); 

}); 