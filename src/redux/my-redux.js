export const createStore = (reducer,middlewares) => {
    if(middlewares){
      return   middlewares(createStore)(reducer)
    }
    let state,
        listens = [];

    const subscribe = callback => {
        listens.push(callback);
    };
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        listens.forEach(callback => callback());
    };

    dispatch({ type: "@@myRedux" });
    return { dispatch, subscribe, getState };
};

export const compose = (...fns) => {
    if (!fns) {
        return data => data;
    }
    if (fns.length == 1) {
        return fns[0];
    }
    return fns.reduce((total, item) => (...args) => total(item(...args)));
};

export function bindActionCreator(actionCreator, dispatch) {
    return (...args) => {
        dispatch(actionCreator(...args));
    };
}

export function bindActionCreators(actionCreators, dispatch) {
    const obj = {};
    Object.keys(actionCreators).forEach(key => {
        obj[key] = bindActionCreator(actionCreators[key], dispatch);
    });
    return obj;
}

//中间件
export const applyMiddleware = (...middlewares)=>(createStore)=>(...args)=>{
    const store = createStore(...args)
    // const dispatch = store.dispatch
    const middlewareAPI={
        getState:store.getState,
        dispatch:(...args)=>store.dispatch(...args)
    }
    const chain = (middlewares.map(middle=>middle(middlewareAPI)))
    const dispatch =compose(...chain)(store.dispatch)
    return {
        ...store,
        dispatch
    }
}

function a(dispatch){
    return function(action){
       return dispatch(action)
    }
}
const logger = (store)=>next=>axtion=>{


}
//所以是数组里的第一个先执行，一次一次执行

//第一个中间件返回
let one = function(action){
    store.dispatch(action)
}
//第二个中间件返回
let two = function(action){
    one(action)
}
//第三个中间件返回
let three = function(action){
    two(action)
}
