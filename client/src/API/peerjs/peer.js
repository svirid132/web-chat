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
        const usersIds = store.getState().socket.webchat?.users.map((user) => roomId + user.id); 
        createStream(true, true, usersIds);
    });

    peer.on('call', (call) => {
        const myStream = streams.get(myId);
        call.answer(myStream);
        call.on('stream', (remoteStream) => {
            console.log("reseive new Stream", remoteStream);
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
        console.log("audio || video");
        navigator.mediaDevices.getUserMedia({ audio, video})
            .then((myStream) => {
                console.log("navigator");
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
            });
    } else {
        stopStreamTracks(streams.get(myId));
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