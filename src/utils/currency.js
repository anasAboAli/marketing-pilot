export function currency(value){

return new Intl.NumberFormat("ar-SA",{

style:"currency",

currency:"SAR",

maximumFractionDigits:0,

}).format(value);

}