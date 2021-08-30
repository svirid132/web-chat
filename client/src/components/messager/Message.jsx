import classNames from 'classnames'

function Message({text, username, isSelf}) {
    return (
        <li className={classNames("message messager__message", {"messager__message-self": isSelf})}>
            <div className="message__wrapper">
                <small className= {classNames("message__username", {"message__username-self": isSelf})}>{username}</small>
                <p className= "message__text">{text}</p>
            </div>
        </li>
    )
}

export default Message
