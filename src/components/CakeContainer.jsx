import {buyCake} from "../redux/index";
import {connect} from "react-redux";


function CakeContainer(props) {
    return (
        <>
            <h1>Number of Cakes - {props.noOfCakes}</h1>
            <button onClick={props.buyCake}>Click Here !</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        noOfCakes: state.noOfCakes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyCake : () => dispatch(buyCake())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)