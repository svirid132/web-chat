import { connect } from "react-redux";
import { createStream } from "../API/peerjs/actionCreator";
import { streams } from "../API/peerjs/peer";
import { Videochat } from "../components";

const mapStateToProps = (state, ownProps) => {
  
    const roomId = state.socket.roomSettings.id;
    const usersFromSocket =  state.socket.webchat.users;
    const users = state.peer.userPeers.map(user => {
        const id = Number(user.id.replace(roomId, ""));
        const userList = usersFromSocket.filter((user) => user.id === id);
        return {
            id: user.id,
            name: userList[0]?.name,
            stream: streams.get(user.id),
        }
    });

    const myName =  state.socket.settings.user.name;
    const myUser = {
        ...state.peer.myPeer,
        name: myName,
        stream: streams.get(state.peer.myPeer.id),
    }
    
return ({
    myUser,
    users,
    className: ownProps.className,
})}

const mapDispatchToProps = dispatch => ({
    createStream: (audio, video) => () => dispatch(createStream(audio, video)),
});

const mergeProps = (stateProp, dispatchProp, ownProp) => ({
    ...stateProp,
    onClickAudio: dispatchProp.createStream(!stateProp.myUser.audio, stateProp.myUser.video),
    onClickVideo: dispatchProp.createStream(stateProp.myUser.audio, !stateProp.myUser.video),
    ...ownProp,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)
    (Videochat);