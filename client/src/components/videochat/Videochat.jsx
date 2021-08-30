import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import Video from "./Video";
import { Redirect } from 'react-router-dom';

function Videochat({myUser, users, className, onClickAudio, onClickVideo}) {

    const allUsers = users?.length + 1; //1 - это myUser
    const maxNavigation = Math.floor(allUsers / 4);
    const [navigation, setNavigation] = useState(Math.floor(allUsers / 4));
    const [isClose, setIsClose] = useState(false);

    const myVideo = <Video key={myUser.id} name = {myUser.name} muted = {true} srcObject={myUser.stream}/>

    const allVideos = users.map((user) => {
        return <Video key={user.id} name = {user.name} srcObject={user.stream} muted={true}/>
    });

    allVideos.unshift(myVideo);

    const firstIndex = navigation * 4;
    const lastIndex = navigation * 4 + 3;
    const navigationVideos = allVideos.filter((video, index) => {
        if (firstIndex <= index && lastIndex >= index)  {
            return true;
        }
        return false;
    });

    if (navigationVideos.length < 4) {
        const restCount = 4 - navigationVideos.length;
        for (let i = 0; i < restCount; ++i) {
            navigationVideos.push(<li key={ -i - 5}></li>);
        }
    }


    const handleOnClickNext = () => setNavigation(navigation < maxNavigation ? navigation + 1 : navigation);
    const handleOnClickBack = () => setNavigation(navigation > 0 ? navigation - 1 : navigation);
    const handleOnClose = () => setIsClose(true);

    if(isClose) {
        setTimeout(() => window.location.reload(), 0); 
        return <Redirect to={"/"}/>;
    }

    return (
        <div className={classNames("videochat", className)}>
            <div className="videochat__wrapper">
                <ul className="videochat__videos">
                    {navigationVideos}
                </ul>
                <header className={classNames(className ,"videochat__menu")}>
                    <div className="navigation videochat__navigation">
                        <button 
                            onClick={handleOnClickBack} 
                            className = { classNames(
                                    "navigation__btn", 
                                    {"navigation__btn--active": navigation > 0 ? true : false}
                                    ) 
                            }>
                        {"<"}</button>
                        <button 
                            onClick={handleOnClickNext} 
                            className = {classNames(
                                    "navigation__btn", 
                                    {"navigation__btn--active":  navigation < maxNavigation ? true : false}) 
                            }>
                        {">"}</button>
                    </div>
                    <button 
                        onClick = {() => onClickAudio()} 
                        className={classNames("videochat__audio", {"videochat__audio--active": myUser.audio})}>
                    <FontAwesomeIcon icon={faCircle}/></button>
                    <button
                        onClick = {() => onClickVideo()} 
                        className={classNames("videochat__video", {"videochat__video--active": myUser.video})}>
                    <FontAwesomeIcon icon={faVideo}/></button>
                    <button className="videochat__close" onClick={() => handleOnClose()}><FontAwesomeIcon icon={faPhone}/></button>
                </header>
            </div>
        </div>
    )
}

Videochat.defaultProps = {
    myUser: {
        id: -1,
        stream: null,
        audio: false,
        video: false,
    },
    users: [],
}

export default Videochat
