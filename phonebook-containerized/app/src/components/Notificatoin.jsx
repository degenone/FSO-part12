const Notification = (props) => {
    const { message } = props;
    return (
        <div className={`notification${message.isError ? ' error' : ''}`}>
            {message.text}
        </div>
    );
};

export default Notification;
