export let cart = [];
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
      }
export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem!==productId){
      newCart.push(cartItem);
    }
  })
  cart=newCart;
}