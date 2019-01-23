import React, { Component } from "react";
import reactDom from "react-dom";
import { Provider, connect } from "./redux/my-react-redux";
// import { Provider, connect } from "react-redux";
import store from "./redux";
import { reduceGun, addGun } from "./redux/actions";
class App extends Component {
    render() {
        const { state } = this.props;
        return (
            <div>
                <div>{state}个人</div>
                <button onClick={this.props.addGun}>增加</button>
                <button onClick={this.props.reduceGun}>减少</button>
            </div>
        );
    }
}

const Root = connect(
    state => ({ state }),
    { reduceGun, addGun }
)(App);

reactDom.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("app")
);

store.subscribe(function() {
});
