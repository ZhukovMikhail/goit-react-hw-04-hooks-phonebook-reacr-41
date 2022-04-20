import './App.styled.jsx';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Container } from 'App.styled';
import { MyForm } from 'components/Form/Form.jsx';
import { Contacts } from 'components/Contacts/Contacts.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  notify = () =>
    toast.warn('That NAME or NUMBER already exist', {
      position: toast.POSITION.TOP_CENTER,
    });
  isContactDubled = (arr, data, key) => {
    return arr.some(
      contact =>
        contact[key].toLocaleLowerCase() === data[key].toLocaleLowerCase(),
    );
  };
  onFormSubmit = data => {
    if (
      this.isContactDubled(this.state.contacts, data, 'name') ||
      this.isContactDubled(this.state.contacts, data, 'number')
    ) {
      this.notify();
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: uuidv4(), ...data }],
    }));
  };
  filterHendle = data => {
    this.setState({ filter: data });
  };
  handleDelete = e => {
    const chengedContacts = this.state.contacts.filter(
      contact => contact.id !== e.currentTarget.parentElement.id,
    );
    this.setState({ contacts: chengedContacts });
  };
  componentDidMount = () => {
    const derivedContact = JSON.parse(localStorage.getItem('contacts'));
    if (derivedContact !== null && derivedContact !== '') {
      this.setState({ contacts: derivedContact });
    }
  };
  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });
    return (
      <Container>
        <h1>Phonebook</h1>
        <MyForm
          onSubmit={this.onFormSubmit}
          contacts={this.state.contacts}
          isContDubled={this.isContactDubled}
        ></MyForm>
        <ToastContainer />
        <h2>Contacts:</h2>
        <Filter onFilter={this.filterHendle}></Filter>
        <Contacts
          contacts={
            this.state.filter !== '' ? filteredContacts : this.state.contacts
          }
          onDelete={this.handleDelete}
        ></Contacts>
      </Container>
    );
  }
}

export default App;

App.propTypes = {
  data: PropTypes.object,
};
