import {memo, useState } from 'react'
import  classNames  from "classnames"


function Video({name, muted, srcObject}) {
    const [isPlay, setIsPlay] = useState(false);
    return (
        <li className = "video">
            <div className = "video__wrapper">
                <video onEnded={() => {setIsPlay(false);}} onPlay={() => setIsPlay(true)} onLoadedMetadata={(e) => {e.target.play(); }} ref={
                    (e) => {
                        if (!e || isPlay) return; 
                        e.pause();
                        e.muted = muted;
                        e.srcObject = srcObject;
                    }
            } />
            <div className = {classNames("video__title-wrapper", {"video__title-wrapper--active": isPlay})}>
                <h2 className ={classNames({"video__title": isPlay})}>
                    { name }
                </h2>
            </div>
            <div className = {classNames("video__stop", {"video__stop--active": !isPlay})}>
                <h2 className="video__stop-title">{name}</h2>
                <p className="video__stop-description">Stop camera</p>
            </div>
        </div>
        </li>
    )
}

export default memo(Video)
