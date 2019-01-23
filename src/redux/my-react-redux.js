import React, { Component } from "react";
import { bindActionCreators } from "./my-redux";
// {Provider ,Consumer}
const StoreContext = React.createContext();


export class Provider extends Component{
    render() {
        const {store} = this.props
        return (
            <StoreContext.Provider value={store}>
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

export function connect(mapStateToProps, mapDispatchToProps) {
    return function(Comp) {
        class ConnectCom extends Component {
            constructor(props) {
                super(props);
                this.state = {};
                this.update = this.update.bind(this);
            }
            componentDidMount() {
                
                this.update();

            }
            update() {
                const { store } = this.props;
                const dispatch = store.dispatch;
                const dispatchProps = bindActionCreators(
                    mapDispatchToProps,
                    dispatch
                );
                this.setState({
                    ...mapStateToProps(store.getState()),
                    ...dispatchProps
                });
                store.subscribe(() => {
                    this.setState({
                        ...this.state,
                        ...mapStateToProps(store.getState()),
                    });
                });
            }
            render() {
                const { store, ...rest } = this.props;
                return <Comp {...rest} {...this.state} />;
            }
        }
        return class A extends Component {
            render() {
                return (
                    <StoreContext.Consumer>
                        {store => <ConnectCom {...this.props} store={store} />}
                    </StoreContext.Consumer>
                );
            }
        };
    };
}
