const Form = (props) => {
    const {
        nameValue,
        nameHandler,
        numberValue,
        numberHandler,
        submitHandler,
    } = props;
    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='newName'>Name:</label>
                <input
                    type='text'
                    name='newName'
                    id='newName'
                    placeholder='Add name'
                    value={nameValue}
                    onChange={nameHandler}
                    required
                />
            </div>
            <div>
                <label htmlFor='newNumber'>Number:</label>
                <input
                    type='text'
                    name='newNumber'
                    id='newNumber'
                    minLength={12}
                    maxLength={12}
                    placeholder='Add phone number'
                    pattern='[0-9]{3}[\s\-][0-9]{3}[\s\-][0-9]{4}'
                    title='Phone number e.g. 123 123 1234 or 123-123-1234'
                    value={numberValue}
                    onChange={numberHandler}
                    required
                />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    );
};

export default Form;
