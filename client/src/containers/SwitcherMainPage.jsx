import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import MessageOnSocket from "./MessagerOnSocket"
import VideochatOnPeer from "./VideochatOnPeer";

function SwitcherMainPage({user}) {

    let { id } = useParams();

    if ( !user?.id ) {
        return <Redirect to={`/${id}`}/>;
    }

    return (
    <div className="videochat-messager">
        <div className="videochat-messager__wrapper">
            <VideochatOnPeer className = "videochat-messager__videochat"/>
            <MessageOnSocket className = "videochat-messager__messager"/>
        </div>
    </div>
    );    
}

const mapStateToProps = (state) => ({
    user: state.socket.settings.user,
});

export default connect(mapStateToProps)
    (SwitcherMainPage);