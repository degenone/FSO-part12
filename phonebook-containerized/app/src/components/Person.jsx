const Person = (props) => {
    const { person, deleteHandler } = props;
    return (
        <p>
            {person.name} ☎️ {person.number}{' '}
            <button type='button' onClick={() => deleteHandler(person.id)}>
                delete
            </button>
        </p>
    );
};

export default Person;
