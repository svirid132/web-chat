import { socket } from "./socket"
import { 
    addMyId,
    connection,
    setNameList,
 } from "./actionCreators/settings";
 import { 
    setNewMessage,
    addNewUser,
    removeUser,
    setHistory
 } from "./actionCreators/webchat";
import { createdRoom, setJoin } from "./actionCreators/roomSettings";
import STATE_JOIN from "./STATE_JOIN";
import { initPeer } from "../peerjs/peer";

export function socketListen(store) {
    socket.on("connect", () => {

        store.dispatch(connection());

        socket.on("list name", (listName) => {
            const userId = store.getState().socket.settings.user?.id;
            //Отписываемся от слушителя!!!
            if(userId) {
                socket.off("list name");
                return;
            }
            store.dispatch(setNameList(listName));
        });

        socket.on("history", (history) => {
            store.dispatch(setHistory(history));
            const ids = history.users?.map((user) => user.id)
            initPeer(ids);
        });

        socket.on("new message", (message) => {
            store.dispatch(setNewMessage(message));
        });


        socket.on("added user", (user) => {
            store.dispatch(addNewUser(user));
        });

        //индетефицируемся на сервере
        socket.on("id", (id) => {
            store.dispatch(addMyId(id));
        });

        socket.on("disconect", (user) => {
            store.dispatch(removeUser(user));
        });

        socket.on("created room", (id) => {
            store.dispatch(createdRoom(id));
        });

        socket.on("succes join", (roomId) => {
            store.dispatch(setJoin(roomId, STATE_JOIN.SUCCES));
        });

        socket.on("failed join", () => {
            store.dispatch(setJoin(null, STATE_JOIN.FAILED));
        });
    }); 
} 