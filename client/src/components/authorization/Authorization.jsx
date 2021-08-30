import classNames from 'classnames';
import {useEffect, useState} from 'react'

export const STATUS_AUTHORIZATION = {
    JOIN: "JOIN",
    CREATE_JOIN: "CREAT",
}

//nameList, getNameList, sendUsername - для статуса join
//createJoin, setUsername - для статуса create_join

function Authorization({status, nameList, sendUsername, setFinalUsername, getNameList, createJoin, className}) {

    useEffect(() => {
        if (status === STATUS_AUTHORIZATION.CREATE_JOIN) return;
        //Не самое лучшое решение, но при проектировании казалась нормально)
        if (nameList === null) {
            getNameList();
        }
    }, [nameList]);
    
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            alert("Введите что-нибудь!");
            return;
        }
        if (nameList?.includes(username)) {
            alert("Введите другое имя, его уже использует другой пользователь");
            setUsername("");
            return;
        }
        if(status === STATUS_AUTHORIZATION.CREATE_JOIN) {
            createJoin(); 
            setFinalUsername(username);
            return;
        }
        sendUsername(username);
    }

    return (
        <div className = {classNames(className, "authorization")}>
            <div className ="authorization__wrapper">
                <form className="authorization__form">
                    <h3 className="authorization__title">Введите любое имя пользователя</h3>
                    <input className="authorization__input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" />
                    <input className="authorization__button" type="submit" onClick={handleSubmit} 
                        value={(status === STATUS_AUTHORIZATION.CREATE_JOIN && "создайть чат") ||
                        (status === STATUS_AUTHORIZATION.JOIN && "присоединится к чату")}
                    />
                </form>
            </div>
      </div>
    )
}

export default Authorization
