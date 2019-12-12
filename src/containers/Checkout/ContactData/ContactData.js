import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false
            },
            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
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

    checkValidty(value,rules) {
        let isValid=true;

        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        console.log(isValid);
        return isValid
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {...this.state.orderForm};
        const updateFormElement = {...updatedOrderForm[inputIdentifier]};
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidty(updateFormElement.value,updateFormElement.validation)
        updatedOrderForm[inputIdentifier] = updateFormElement;
        this.setState({orderForm: updatedOrderForm})
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElementsArray.map(formElement =>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType={'Success'}>ORDER</Button>
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