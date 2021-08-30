import { connect } from "react-redux";
import { createStream } from "../API/peerjs/actionCreator";
import { streams } from "../API/peerjs/peer";
import { Videochat } from "../components";

const mapStateToProps = (state, ownProps) => {
  
    const userStreams = state.peer.userPeers.map(user => {
        return {
            id: user.id,
            stream: streams.get(user.id),
        }
    });

    const myStream = {
        ...state.peer.myPeer,
        stream: streams.get(state.peer.myPeer.id),
    }
    
return ({
    myStream,
    userStreams,
    className: ownProps.className,
})}

const mapDispatchToProps = dispatch => ({
    createStream: (audio, video) => () => dispatch(createStream(audio, video)),
});

const mergeProps = (stateProp, dispatchProp, ownProp) => ({
    ...stateProp,
    onClickAudio: dispatchProp.createStream(!stateProp.myStream.audio, stateProp.myStream.video),
    onClickVideo: dispatchProp.createStream(stateProp.myStream.audio, !stateProp.myStream.video),
    ...ownProp,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)
    (Videochat);