import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  priceCents:0,
  },{
  id:'2',
  deliveryDays:3,
  priceCents:499},
  {
  id:'3',
  deliveryDays:1,
  priceCents:999
  }];
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
    deliveryOptions.forEach((option)=>
    {
      if(option.id === deliveryOptionId){
        deliveryOption=option;
      }
    })
    return deliveryOption || [0];
}
function isWeekend(date) {
  const day = date.day();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
}
export function calculateDeliveryDate(deliveryOption) {
 let deliveryDate = dayjs();
 let remainingDays=deliveryOption.deliveryDays;
 while (remainingDays>0){
  deliveryDate=deliveryDate.add(1,'days')
  if (!isWeekend(deliveryDate)){
    remainingDays--;
  }
 }
 return deliveryDate.format('dddd, MMMM D');
}