export function formatDate(date){

return new Intl.DateTimeFormat("ar-SA").format(

new Date(date)

);

}