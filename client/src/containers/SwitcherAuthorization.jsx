import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import AuthorizationOnSocket from "./AuthorizationOnSocket";
import CreatedRoom from "../components/authorization/CreatedRoom";
import STATE_JOIN from "../API/socket/STATE_JOIN";
import { joinRoom } from "../API/socket/actionCreators/roomSettings";
import { STATUS_AUTHORIZATION } from "../components/authorization/Authorization";
import { addUsername } from "../API/socket/actionCreators/settings";

function SwitcherAuthorization({roomId, stateJoin, user, join, sendUsername}) {

    const { id: urlId } = useParams();

    //Если прошел аунтификацию переходим в мессенджер
    if ( user?.id ) return <Redirect to={`/messager/${roomId || urlId}`}/>;

    let statusAuthorization = STATUS_AUTHORIZATION.CREATE_JOIN;

    if (urlId) {
        if (stateJoin === STATE_JOIN.WAIT_JOIN) {
            join(urlId);
        }
        if (stateJoin === STATE_JOIN.FAILED) {
            alert("Такой комнаты нету, создайте её");
            setTimeout(() => window.location.reload(), 0); 
            return <Redirect to={"/"}/>;
        }
        statusAuthorization = STATUS_AUTHORIZATION.JOIN;
    }

    //Соедниение в случае создания комноты
    if (roomId && !urlId && stateJoin === STATE_JOIN.WAIT_JOIN) {
        join(roomId);
    }

    return (
        <div className = "switcher-authorization">
            <div className = "switcher-authorization__wrapper">
                { stateJoin === STATE_JOIN.SUCCES && !urlId && 
                    <CreatedRoom 
                    url={`${window.location.href}${roomId}`} 
                    className="switcher-authorization__info-room" 
                    onClick = {sendUsername(user.name)}/>
                }
                <AuthorizationOnSocket status={statusAuthorization} className="switcher-authorization__authorization"/>
            </div>
        </div>
    );    
}

const mapStateToProps = state => ({
    roomId: state.socket.roomSettings.id,
    stateJoin: state.socket.roomSettings.stateJoin,
    user: state.socket.settings.user,
});

const mapDispatchToProps = dispatch => ({
    join: (id) => dispatch(joinRoom(id)),
    sendUsername: (username) => () => dispatch(addUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)
    (SwitcherAuthorization);