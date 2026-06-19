export let cart = localStorage.JSON.parse(getItem('cart')) || [];
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId, StrQuan){
  let matchingitem;
      cart.forEach((cartItem)=>{
        if (productId===cartItem.productId){
          matchingitem=cartItem;
        }
      })
       if(matchingitem){
          matchingitem.Quantity+=Number(StrQuan);
        }
        else{
          cart.push({
          productId,
          Quantity: Number(StrQuan)
          })
        }
        saveToStorage();
      }
export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem!==productId){
      newCart.push(cartItem);
    }
  })
  cart=newCart;
  saveToStorage();
}