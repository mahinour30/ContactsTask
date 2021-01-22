import {ADD, DEL} from './Actions';

export let Reducer = (state = [], action)=>{
    let newContact ;
    switch (action.type){
        case ADD:
            newContact=[...state];
            newContact.push(action.payload);
            return newContact; 
            
        case DEL:
            newContact = [...state];
            newContact=newContact.filter(contact => contact.id != action.payload)
            return newContact;    
    }
    return state;
}