import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withError from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    componentDidMount(){
      this.props.onFetchOrders(this.props.token,this.props.userId);
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
        token: state.authReducer.tokenId,
        userId: state.authReducer.userId
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));