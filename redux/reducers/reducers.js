import { ADD_CONTACT, DELETE_CONTACT } from '../actions/types';

const initialState = {
  contactList: []
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contactList: state.contactList.concat({
          key: Math.random(),
          name: action.data
        })
      };
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