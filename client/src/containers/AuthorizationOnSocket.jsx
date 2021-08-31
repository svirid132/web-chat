import { connect } from "react-redux";
import { createRoom } from "../API/socket/actionCreators/roomSettings";
import { addUsername, setFinalUsername } from "../API/socket/actionCreators/settings";
import { Authorization} from "../components";

const mapStateToProps = (state, ownProps) => ({
    nameList: state.socket.settings.nameList,
    className: ownProps.className,
    status: ownProps.status,//Статус авторизации, завист от URL страницы
});


//Избыточная логика, нужно после попытаться сделать управяемый компонент
//Тогда уберется надобность в nameList
const mapDispatchToProps = dispatch => ({
    sendUsername: (username) => dispatch(addUsername(username)),
    setFinalUsername: (username) => dispatch(setFinalUsername(username)),
    createJoin: () => dispatch(createRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)
    (Authorization);

