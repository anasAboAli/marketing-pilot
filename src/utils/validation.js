export function required(value){

return !!value||"هذا الحقل مطلوب";

}

export function email(value){

return /\S+@\S+\.\S+/.test(value)

||"البريد الإلكتروني غير صحيح";

}

export function min(value,length){

return value.length>=length

||`يجب ألا يقل عن ${length} أحرف`;

}