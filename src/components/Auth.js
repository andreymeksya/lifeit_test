import React from 'react';
import axios from 'axios';
import { withAlert } from 'react-alert'


class Auth extends React.Component{
    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/users');
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const body = {
            email: email,
            password: password
        };
        axios.post('https://reqres.in/api/login/', body)
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            this.props.history.push('/users');
        })
        .catch((error) => {
            this.props.alert.error(error.response.data.error)
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type='text' name='email' onChange={this.onChange} value={this.state.email}/>
                <input type='password' name='password' onChange={this.onChange} value={this.state.password}/>
                <button type="submit">Кнопка</button>
            </form>
        )
    }
}

export default withAlert()(Auth)