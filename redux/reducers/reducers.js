import { ADD_CONTACT, DELETE_CONTACT } from '../actions/types';

// initial value of the state
const initialState = {
  contactList: []
}

const contactReducer = (state = initialState, action) => {
  // for selection
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contactList: state.contactList.concat({
          key: Math.random(),
          name: action.data
        })
      };

    // for un select 
    case DELETE_CONTACT:
      return {
        ...state,
        contactList: state.contactList.filter((item) =>
          item.key !== action.key)
      };
    default:
      return state;
  }
}

export default contactReducer;