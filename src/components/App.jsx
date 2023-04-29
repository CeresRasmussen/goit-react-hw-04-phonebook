import React, { useState, useEffect } from 'react';
import { InputForm } from 'components/InputForm/InputForm';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = newContact => {
    if (
      contacts.some(contact => {
        return contact.name === newContact.name;
      })
    ) {
      toast.error(`${newContact.name} is alredy in Phonebook `);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(5), ...newContact }]);
  };

  const onFilterContacts = query => {
    setFilter(query.target.value);
  };

  const filteredContactsFunc = () => {
    const list = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return list;
  };

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = filteredContactsFunc();

  return (
    <div
      style={{
        display: 'flex',
        width: '460px',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'center',
        backgroundColor: 'antiquewhite',
        color: '#010101',
        gap: '30px',
        border: '1px solid black',
        borderRadius: '4px',
      }}
    >
      <InputForm onSubmitForm={onSubmitForm}></InputForm>
      <Contacts contacts={filteredContacts} deleteContacts={deleteContacts}>
        <Filter onFilterContacts={onFilterContacts} value={filter}></Filter>
      </Contacts>
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};
