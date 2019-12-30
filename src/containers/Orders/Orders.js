import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withError from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    componentDidMount(){
      this.props.onFetchOrders(this.props.token);
    }

    render(){
        let orderList = <Spinner />

        if(!this.props.loading){
            orderList= this.props.orders.map(order =>(
             <Order 
                 key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                />
            ))
        }

        return(
            <div>
                {orderList}
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.tokenId
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));