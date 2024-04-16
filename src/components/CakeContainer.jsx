import {buyCake} from "../redux/index";
import {connect} from "react-redux";
import {useState} from "react";


function CakeContainer(props) {
    const [noOfCakes, setNoOfCakes] = useState(0)
    return (
        <>
            <h1>Number of Cakes - {props.noOfCakes}</h1>
            <input type="text" onChange={(e) => setNoOfCakes(e.target.value)}/>
            <button onClick={() => props.buyCake(noOfCakes)}>Click Here !</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        noOfCakes: state.cake.noOfCakes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyCake : (number) => dispatch(buyCake(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)