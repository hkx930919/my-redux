// import { createStore } from "redux";
import { createStore,applyMiddleware } from "./my-redux";
import { guns } from "./actions";
//在中间件中，next参数是在使用compose组合函数时，后面的中间件装饰好后的dispatch。如果不调用next，那么后面的中间件都不会执行
//在logger中，next = (action)=>{logger2(store)(store.dispatch(action))} 如果
const logger = store=>next=>action=>{
    store.dispatch(action)
    console.log('第一个中间价');
    
   console.log('dispatch:',action);
  setTimeout(()=>{
    // next(action)
   console.log('nextState:',store.getState());

  },2000) 
    
}
const logger2 = store=>next=>action=>{
    console.log('第二个中间价！！！！！！！！！！！！！！！！');
    
   console.log('dispatch:',action);
  setTimeout(()=>{
    next(action)
   console.log('nextState:',store.getState());

  },2000) 
    
}
const state = createStore(guns,applyMiddleware(logger,logger2));
export default state
