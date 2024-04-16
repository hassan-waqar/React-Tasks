import {buyCake} from "../redux/cake/cakeActions";
import {useDispatch, useSelector} from "react-redux";


function HooksCakeContainer(props) {
    const noOfCakes = useSelector(state => state.cake.noOfCakes)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Number of Cakes - {noOfCakes}</h1>
            <button onClick={() => dispatch(buyCake(1))}>Click Here !</button>
        </>
    )
}

export default HooksCakeContainer