import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';

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
        }

    }

    render(){
        return(
            <div className={'ContactData'}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your Name'/>
                    <input type='email' name='email' placeholder='Your Email'/>
                    <input type='text' name='street' placeholder='Street'/>
                    <input type='text' name='zipCode' placeholder='ZipCode'/>
                    <input type='text' name='country' placeholder='Country'/>
                    <Button btnType={'Sucesses'}>ORDER</Button>
                </form>
            </div>

        );
    }

}
export default ContactData;