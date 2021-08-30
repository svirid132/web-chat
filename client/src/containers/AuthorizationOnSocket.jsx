import { connect } from "react-redux";
import { createRoom } from "../API/socket/actionCreators/roomSettings";
import { addUsername, getNameList, setFinalUsername } from "../API/socket/actionCreators/settings";
import { Authorization} from "../components";

const mapStateToProps = (state, ownProps) => ({
    nameList: state.socket.settings.nameList,
    className: ownProps.className,
    status: ownProps.status,
});


//Избыточная логика, нужно после попытаться сделать управяемый компонент
//Тогда уберется надобность в nameList
const mapDispatchToProps = dispatch => ({
    getNameList: () => dispatch(getNameList()),
    sendUsername: (username) => dispatch(addUsername(username)),
    setFinalUsername: (username) => dispatch(setFinalUsername(username)),
    createJoin: () => dispatch(createRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)
    (Authorization);

