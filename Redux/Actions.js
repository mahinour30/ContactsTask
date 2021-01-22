export const ADD = 'ADD';
export const DEL = 'DEL';

export function add (contact){
    return{
        type:'ADD',
        payload:contact,
    }
}

export function del (contactID){
    return{
        type:'DEL',
        payload:contactID,
    }
}
