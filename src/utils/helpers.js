export function sleep(ms){

return new Promise(resolve=>{

setTimeout(resolve,ms);

});

}

export function randomId(){

return Math.random()

.toString(36)

.substring(2,10);

}