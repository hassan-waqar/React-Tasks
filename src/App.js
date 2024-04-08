// Run On Node

const redux = require('redux')
const createStore = redux.createStore;


const BUY_CAKE = "BUY_CAKE"

const buyCake = () => {
    return {
        type : BUY_CAKE,
        info : "First Redux Action"
    }
}

const initialValues = {
    numOfCakes : 10
}
const reducer = (state = initialValues, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes -1
        }

        default : return state
    }
}

const store = createStore(reducer)
console.log("Initial State : ", store.getState())
const unsubscribe = store.subscribe(()=> console.log("Updated Value : ", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()