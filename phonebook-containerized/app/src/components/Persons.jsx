import Person from './Person';

const Persons = (props) => {
    const { persons, deleteHandler } = props;
    return (
        <>
            {persons.map((person) => (
                <Person
                    key={person.id}
                    person={person}
                    deleteHandler={deleteHandler}
                />
            ))}
        </>
    );
};

export default Persons;
