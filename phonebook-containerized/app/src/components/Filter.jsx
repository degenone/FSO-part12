const Filter = (props) => {
    const { value, handler } = props;
    return (
        <div>
            <label htmlFor='filter'>Filter:</label>
            <input
                type='text'
                id='filter'
                name='filter'
                placeholder='Filter names'
                value={value}
                onChange={handler}
            />
        </div>
    );
};

export default Filter;
