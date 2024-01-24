import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Form from './components/Form';
import personService from './services/Persons';
import Notification from './components/Notificatoin';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [notificatoin, setNotificatoin] = useState(null);
    const personsToList =
        filterBy.trim().length === 0
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filterBy.toLowerCase())
              );

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => setPersons(initialPersons));
    }, []);

    const handleNameChange = (e) => {
        const { value } = e.target;
        setNewName(value);
    };

    const handleNumberChange = (e) => {
        const { value } = e.target;
        setNewNumber(value);
    };

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setFilterBy(value);
    };

    const addPerson = (e) => {
        e.preventDefault();
        if (newName.trim().length === 0 || newName.trim().length === 0) return;
        const personObj = {
            name: newName,
            number: newNumber,
        };
        if (personExists(personObj)) return;
        personService
            .create(personObj)
            .then((addedPerson) => {
                setPersons([...persons, addedPerson]);
                setNewName('');
                setNewNumber('');
                showNotificatoin(`Added ${addedPerson.name} to the phonebook.`);
            })
            .catch((e) => {
                console.log(e);
                showNotificatoin(e.response.data.error, true);
            });
    };

    const updatePerson = (personObj) => {
        const confirm = window.confirm(
            `Update the phone number for "${personObj.name}"?`
        );
        if (!confirm) return;
        const person = persons.find(
            (p) => p.name.toLowerCase() === personObj.name.toLowerCase()
        );
        const updatedObj = { ...person, number: personObj.number };
        personService.update(updatedObj).then((updatedPerson) => {
            setPersons(
                persons.map((p) =>
                    p.id === updatedPerson.id ? updatedPerson : p
                )
            );
            setNewName('');
            setNewNumber('');
            showNotificatoin(
                `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}.`
            );
        });
    };

    const deletePerson = (id) => {
        const person = persons.find((p) => p.id === id);
        const name = person.name;
        const confirm = window.confirm(
            `Are you sure you want to delete "${name}"?`
        );
        if (!confirm) return;
        personService
            .delPerson(id)
            .then(() => {
                showNotificatoin(
                    `Person "${name}" was deleted from the phonebook.`
                );
                setPersons(persons.filter((p) => p.id !== id));
            })
            .catch(() => {
                showNotificatoin(`Person "${name}" was already deleted.`, true);
                setPersons(persons.filter((p) => p.id !== id));
            });
    };

    const personExists = (newPerson) => {
        const regex = /[\s-]/g;
        const number = newPerson.number.replaceAll(regex, '');
        if (
            persons.filter(
                (person) => person.number.replaceAll(regex, '') === number
            ).length !== 0
        ) {
            alert(`"${newPerson.number}" is already in the phonebook!`);
            return true;
        }
        if (
            persons.filter(
                (person) =>
                    person.name.toLowerCase() === newPerson.name.toLowerCase()
            ).length !== 0
        ) {
            updatePerson(newPerson);
            return true;
        }
        return false;
    };

    const showNotificatoin = (text, isError = false) => {
        setNotificatoin({
            text: text,
            isError: isError,
        });
        setTimeout(() => setNotificatoin(null), 5000);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            {notificatoin !== null && <Notification message={notificatoin} />}
            <Filter value={filterBy} handler={handleFilterChange} />
            <h2>Add a new person</h2>
            <Form
                nameValue={newName}
                nameHandler={handleNameChange}
                numberValue={newNumber}
                numberHandler={handleNumberChange}
                submitHandler={addPerson}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToList} deleteHandler={deletePerson} />
        </div>
    );
};

export default App;
