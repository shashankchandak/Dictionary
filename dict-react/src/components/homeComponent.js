import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlusSquare, faBook } from "@fortawesome/free-solid-svg-icons";


library.add(faSearch, faPlusSquare, faBook);


function ErrorMessage({errorMessage,es}){
    console.log(es)
    if(es){
        return (
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        );
    }
    else
        return(<div></div>);

}

class HomeComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            userObject: '',
            wordToSearch: '',
            error: false
        }

        this.searchWord = this.searchWord.bind(this)


    }

    updateState = (input) => {

        let name = input.target.name
        let value = input.target.value
        //console.log(value);

        this.setState({
            [name]: value
        })
    }


    searchWord() {
        this.setState({
            es:false
        })
        let word = this.state.wordToSearch
        //To maintain session and authorize each request when a user logs in he receives a token
        //this token needs to be added to authorization header of payload and to be sent to server for every request
        const authHeader = { headers: { Authorization: this.state.userObject.tokenType + ' ' + this.state.userObject.accessToken } };
        const url = "http://localhost:9999/words/" + word
        axios.get(url, authHeader).then(response => {

            console.log(response)
            let word={word:response.data};
            if (response.status == 200) {
                this.props.history.push('/meaning', word)
                

            }
            else{
                console.log(response);
                this.setState({
                    es:true
                })
            }


        }).catch(
            error => {
                this.setState({
                    es:true
                })
                console.log(error.response.data.details)}
        );
    }

    render() {

        //Only admin users can add a new word so new word button would be disabled for normal user
        let isAdmin = false
        this.state.userObject = this.props.location.state
        if (this.state.userObject.roles.includes('ROLE_ADMIN'))
            isAdmin = true
        //console.log(this.state.userObject)     
        console.log(isAdmin);

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-8 mx-auto">
                            <div className="card shadow" style={{ borderRadius: "10px", marginTop: "100px", padding: "20px" }}>
                            <ErrorMessage errorMessage={'Word Not found'} es={this.state.es}/>

                                <div className="card-body">
                                    <div className="form-group d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control mr-2 w-75" name="wordToSearch" placeholder="Search word here..." onChange={this.updateState} />
                                        <button onClick={this.searchWord} className="btn btn-primary"><FontAwesomeIcon icon="search" className="mr-2" />Search</button>
                                    </div>

                                    <div className="text-center mt-5">
                                        <Link to={{
                                            pathname: "/displayWords",
                                            state: { 'user': this.state.userObject }
                                        }}><button className="btn btn-primary"><FontAwesomeIcon icon="book" className="mr-2" />View All Words</button></Link>


                                        {
                                            isAdmin &&
                                            <Link to={{
                                                pathname: "/addNewWord",
                                                state: { 'user': this.state.userObject, 
                                                          'update':0  }
                                            }}>
                                                <button className="btn btn-primary ml-5"><FontAwesomeIcon icon="plus-square" className="mr-2" />Add Word</button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeComponent;