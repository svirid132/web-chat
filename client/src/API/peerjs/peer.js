import Peer from "peerjs";
import { store } from "../../app/store";
import { setMyStream, addStream } from "./actionCreator";

let peer;
let myId;
let roomId;

//Id у peer схож с id у сокету; peerId = socketId
export function initPeer(ids) {
    if (myId) return;
    roomId = store.getState().socket.roomSettings.id;
    myId = roomId +
        store.getState().socket.settings.user.id;
    console.info(myId);
    console.info(ids);
    openPeer(ids);
} 

//Store не может хранить такие данные
export const streams = new Map();

function openPeer(ids) {
    peer = new Peer(myId,{});

    peer.on("open", (myId) => { 
        const peerIds = ids?.map((id) => roomId + id); 
        createStream(true, true, peerIds);
    });

    peer.on('call', (call) => {
        const myStream = streams.get(myId);
        call.answer(myStream);
        call.on('stream', (remoteStream) => {
            streams.set(call.peer, remoteStream);
            store.dispatch(addStream({id: call.peer}));
        }, function(err) {
            console.log('Failed to get local stream', err);
        });
    });
}

export function createStream(audio, video, userIds) {  

    //audio, video: bool
    const oldStream = streams.get(myId);
    if (oldStream) {
        stopStreamTracks(oldStream);
    }
    if (audio || video) {
        navigator.mediaDevices.getUserMedia({ audio: false, video})
            .then((myStream) => {
                streams.set(myId, myStream);
                store.dispatch(setMyStream(myId, audio, video));

                userIds.forEach((id) => {
            
                    if (myId === id) return;
                    const call = peer.call( id, myStream);
                    call.on("stream", (remoteStream) => {
                        streams.set(call.peer, remoteStream);
                        store.dispatch(addStream({id: call.peer}));
                    });
        
                }, function(err) {
                    console.log('Failed to get local stream' ,err);
                });
            }, () => alert("Для нормальной рабты вебчата, необходимо иметь переферийные устройства ввода и ввывода аудио и видео!"));
    } else {
        stopStreamTracks(streams.get(myId));
    }
}

function stopStreamTracks(stream) {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
        track.stop();
    });
    stream.getAudioTracks().forEach((track) => {
        track.stop();
    })
}