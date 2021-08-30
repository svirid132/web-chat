function SpecialMessage({name, text}) {
    return (
        <li className ="special-message messager__message messager__message--special">
            <div className="special-message__wrapper">
                <h4 className="special-message__name">{name}</h4>
                <p className= "special-message__text">{text}</p>
            </div>
        </li>
    )
}

export default SpecialMessage
