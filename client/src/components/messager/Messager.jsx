import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import Message from './Message';
import SpecialMessage from "./SpecialMessage"
import classNames from 'classnames';

function Messager({user, users, messages, getHistory, sendNewMessage, className}) {
    
    const [text, setText] = useState("");

    //Выстрел в себе ногу
    useEffect(() => {
        if (messages === null) {
            getHistory();
        }
    }, [messages]);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (text === "") return;
      setText("");
      sendNewMessage({user, text});
    }

    const messageElems = messages && messages.map((message) => {
        if (message.id <= 0) {
            return <SpecialMessage key = {message.id} name = {message.name} text = {message.text}/>
        }
        const isSelf = message.user.id === user.id;//Находим себя в сообщениях
        return <Message key={ message.id } username={message.user.name} text = {message.text} isSelf={isSelf}/>}
    );
    return (
        <div className={classNames("messager", className)}>
            <div className="messager__wrapper">
            <div className="messager__wrapper-messages">
                <ul className="messager__mesagges">
                    { messageElems }
                </ul>
                <span ref={(e) => { e?.scrollIntoView({ behavior: "smooth" })}}></span>
            </div>
            <form className="messager__form">
                <input type="text" placeholder="Сообщение" value={text} onChange={(e) => setText(e.target.value)}/>
                <button type="sumbit" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
            </div>
        </div>
        );
}

export default Messager
