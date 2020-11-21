import React, { Component } from 'react';
import AuthService from '../services/auth';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { Alert } from 'bootstrap';




class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            username: '',
            errors: {
                emailError: 'Cannot be empty',
                passwordError: 'Cannot be empty'
            }
        }

        this.login = this.login.bind(this)

    }

    updateState = (input) => {

        let name = input.target.name
        let value = input.target.value

        this.setState({
            [name]: value
        })
    }




    login() {

        let username = this.state.username
        let password = this.state.password

        console.log("Username " + username + " Password is " + password)

        //Call login api
        AuthService.loginUser(username, password)
            .then(response => {

                console.log(response.data)
                let user = response.data
                if (response.status == 200) {

                    this.props.history.replace('/home', user)

                }


            }).catch(
                error => {
                    console.log(error.response.data.details)
                    alert('Incorrect details')
                }
            );

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
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Enter username" name="username" onChange={this.updateState} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.updateState} />
                                    </div>
                                    <div className="text-center pt-2">
                                        <button onClick={this.login} className="btn btn-outline-primary btn-lg">Login</button>
                                        <Link to="/signup">
                                            <p className="mt-3">New User ? Sign Up</p>
                                            {/* <button className="btn btn-primary btn-sm">Register</button> */}
                                        </Link>
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

export default LoginComponent;