import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        orderForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignup: true
    }


    checkValidty(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updateFormElement = { ...updatedOrderForm[inputIdentifier] };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidty(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.orderForm.email.value,
            this.state.orderForm.password.value,
            this.state.isSignup);
    }

    switchAuthMethod = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    ))}
                    <Button btnType={'Success'} disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
                <Button btnType={'Danger'} action={this.switchAuthMethod}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={'Auth'}>
                {form}
            </div>

        );
    }

}

const mapStateProps = state => {
    return {

    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup))
    };
}

export default connect(null, mapDispatchToProps)(withErrorHandler(Auth, axios));