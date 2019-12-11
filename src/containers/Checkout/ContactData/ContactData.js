import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        deliveryMethod: 'fastest',
        customer: {
            name: '',
            email: ''
        },
        address: {
            street: '',
            zipCode: '',
            country: ''
        },
        loading: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryMethod: 'fastest',
            customer: {
                name: 'Samuel',
                email: 'teste@teste',
                address: {
                    street: 'Avenida Paulista',
                    zipCode: '01311-936',
                    country: 'Brasil'
                }
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error);
            });
    }

    render() {
        let form = (
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='email' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Street' />
                <input type='text' name='zipCode' placeholder='ZipCode' />
                <input type='text' name='country' placeholder='Country' />
                <Button btnType={'Success'} action={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={'ContactData'}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        );
    }

}
export default ContactData;