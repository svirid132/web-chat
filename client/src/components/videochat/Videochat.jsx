import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import Video from "./Video";

function Videochat({myStream, userStreams, className, onClickAudio, onClickVideo}) {

    const allUsers = userStreams?.length + 1; //1 - это myStream
    const maxNavigation = Math.floor(allUsers / 4);
    const [navigation, setNavigation] = useState(Math.floor(allUsers / 4));

    const myVideo = <Video key={myStream.id} muted = {true} srcObject={myStream.stream}/>

    const allVideos = userStreams.map((user) => {
        console.info("userStream_2", user.stream);
        return <Video key={user.id} srcObject={user.stream} muted={true}/>
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
                                    {"navigation__btn--active": navigation < maxNavigation ? true : false}
                                    ) 
                            }>
                        {"<"}</button>
                        <button 
                            onClick={handleOnClickNext} 
                            className = {classNames(
                                    "navigation__btn", 
                                    {"navigation__btn--active":  navigation > 0 ? true : false}) 
                            }>
                        {">"}</button>
                    </div>
                    <button 
                        onClick = {() => onClickAudio()} 
                        className={classNames("videochat__audio", {"videochat__audio--active": myStream.audio})}>
                    <FontAwesomeIcon icon={faCircle}/></button>
                    <button
                        onClick = {() => onClickVideo()} 
                        className={classNames("videochat__video", {"videochat__video--active": myStream.video})}>
                    <FontAwesomeIcon icon={faVideo}/></button>
                    <button className="videochat__close"><FontAwesomeIcon icon={faPhone}/></button>
                </header>
            </div>
        </div>
    )
}

Videochat.defaultProps = {
    myStream: {
        id: -1,
        stream: null,
        audio: false,
        video: false,
    },
    userStreams: [],
}

export default Videochat
