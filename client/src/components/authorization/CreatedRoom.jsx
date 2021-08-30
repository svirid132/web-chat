import classNames from 'classnames'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useState } from 'react'

function CreatedRoom({url, className, onClick}) {
    const [isCopied, setIsCopied] = useState(false)
    return (
        <div className = {classNames(className, "created-room")}>
            <div className = "created-room__wrapper-external">
                <div className = "created-room__wrapper-inner">
                    <div className="created-room__description-text">
                        <h2 className="created-room__title">Ссылка на комноту</h2> 
                        <p>Нажмите на нее, чтобы скопировать:</p>
                    </div>
                    <div className = "created-room__copy">
                        <CopyToClipboard onCopy = {() => setIsCopied(true)} text={url}>
                            <input className = "created-room__copy-text" type="text" name="ссылка" value={url} readOnly/>
                        </CopyToClipboard>
                        {isCopied && <p className="created-room__description-copy">Ссылка скопирована в буфер</p>}
                    </div>
                    <button onClick={() => onClick()} className = "created-room__btn">Перейти в чат</button>
                </div>
            </div>
        </div>
    )
}

export default CreatedRoom
