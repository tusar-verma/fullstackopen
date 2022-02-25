const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }
    let class_Name = 'error'
    if (type) class_Name = 'succesful'

    return (
        <div className={class_Name}>
            {message}
        </div>
    )
}

export default Notification
