import { ADD_CONTACT, DELETE_CONTACT } from './types';

export const addContact = (contact) => (
  {
    type: ADD_CONTACT,
    data: contact
  }
);

export const deleteContact = (key) => (
  {
    type: DELETE_CONTACT,
    key: key
  }
);