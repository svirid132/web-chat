import {memo, useState } from 'react'

function Video({muted, srcObject}) {
    const [isPlay, setIsPlay] = useState(false);


    if (!srcObject) return <li></li>;

    return (
        <li>
            <video preload = "metadata" onLoadedMetadata={(e) => {e.target.play();  setIsPlay(true); console.log("userStream_5", e.srcObject); }} ref={
                (e) => {
                    if (!e || isPlay) return; 
                    e.pause();
                    e.muted = muted;
                    e.srcObject = srcObject;
                }
        } />
        </li>
    )
}

export default memo(Video)
