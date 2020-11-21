import React, { Component } from 'react';
import AuthService from '../services/auth';
import { Redirect } from 'react-router-dom';


function Message({ Message, m }) {
    if (m) {
        return (
            <div class="alert alert-success" role="alert">
                {Message}
            </div>
        );
    }
    else
        return (<div></div>);

}

class SignupComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            m: false,
            email: '',
            password: '',
            username: '',
            errors: {
                emailError: 'Cannot be empty',
                passwordError: 'Cannot be empty'
            }
        }

        this.signup = this.signup.bind(this)

    }

    updateState = (input) => {

        let name = input.target.name
        let value = input.target.value

        this.setState({
            [name]: value
        })
    }



    signup() {


        let username = this.state.username
        let email = this.state.email
        let password = this.state.password

        AuthService.registerUser(username, email, password)
            .then(response => {

                // console.log(response.data)

                if (response.status == 200) {
                    this.setState({
                        m: true
                    })
                    setTimeout(function () {
                        this.props.history.replace('/');

                    }.bind(this), 2000);
                }


            })


    }



    render() {
        return (
            <body
                style={{
                    backgroundImage: "url(" + "https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixlib=rb-1.2.1&w=1000&q=80" + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: "100vh"
                }}
            >
                <div className="container">
                    <div className="row">


                        <h3 className="mx-auto py-5">Welcome to Technical Dictionary by IWish Software</h3>
                        <div className="col-6 mx-auto">
                            <div className="card shadow" style={{ borderRadius: "10px" }}>
                                <Message Message={'User registered sucessfully,login to proceed'} m={this.state.m} />
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Enter username" name="username" onChange={this.updateState} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="text" className="form-control" placeholder="Enter email" name="email" onChange={this.updateState} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.updateState} />
                                    </div>
                                    <div className="text-center">
                                        <button onClick={this.signup} className="btn btn-outline-primary btn-lg">Sign Up</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </body>

        );
    }
}

export default SignupComponent;