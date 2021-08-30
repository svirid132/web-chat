import Peer from "peerjs";
import { store } from "../../app/store";
import { setMyStream, addStream } from "./actionCreator";

let peer;
let myId;
let roomId;

//Id у peer схож с id у сокету; peerId = socketId
export function initPeer() {
    if (myId) return;
    roomId = store.getState().socket.roomSettings.id;
    myId = roomId +
        store.getState().socket.settings.user.id;
    openPeer();
} 

//Store не может хранить такие данные
export const streams = new Map();

function openPeer() {
    peer = new Peer(myId);

    peer.on("open", (myId) => { 
        //Выстрел себе ногу, состояние гонки!
        const users = store.getState().socket.webchat.users; 
        createStream(true, true, users);
    });

    peer.on('call', (call) => {
        if (streams.has(call.peer)) return;
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

export function createStream(audio, video, users) {  

    //audio, video: bool
    const oldStream = streams.get(myId);
    if (oldStream) {
        stopStreamTracks(oldStream);
    }
    if (audio || video) {
        navigator.mediaDevices.getUserMedia({ audio, video})
            .then((myStream) => {
                streams.set(myId, myStream);
                store.dispatch(setMyStream(myId, audio, video));

                const ids = users?.map((user) => user.id);
                ids?.forEach((id) => {
            
                    if (myId === roomId + id) return;
                    const call = peer.call( roomId + id, myStream);
                    call.on("stream", (remoteStream) => {
                        streams.set(call.peer, remoteStream);
                        store.dispatch(addStream({id: call.peer}));
                    });
        
                }, function(err) {
                    console.log('Failed to get local stream' ,err);
                });
            });
    }
}

function stopStreamTracks(stream) {
    stream.getVideoTracks().forEach((track) => {
        track.stop();
    });
    stream.getAudioTracks().forEach((track) => {
        track.stop();
    })
}