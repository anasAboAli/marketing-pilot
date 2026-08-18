export function statusColor(status){

switch(status){

case"نشط":

return"green";

case"موقوف":

return"red";

case"جديد":

return"blue";

case"تم التواصل":

return"yellow";

default:

return"gray";

}

}