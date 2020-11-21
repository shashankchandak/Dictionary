import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";


library.add(faEdit, faTrash);

class WordListComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            words: [],
            userObject: ''
        }

    }

    handleDelete = (word) => {
       
        const url="http://localhost:9999/words/"+word.wid;
        console.log(this.state.userObject.accessToken);
        const authHeader = { headers: { Authorization: this.state.userObject.tokenType + ' ' + this.state.userObject.accessToken } };
        axios.delete(url,authHeader).then(response => {

            console.log(response.data)

            if (response.status == 200) {
                    this.getAllWords();

            }


        })

    }


    getAllWords() {

        //To maintain session and authorize each request when a user logs in he receives a token
        //this token needs to be added to authorization header of payload and to be sent to server for every request
        const authHeader = { headers: { Authorization: this.state.userObject.tokenType + ' ' + this.state.userObject.accessToken } };
        //console.log(authHeader)
        axios.get("http://localhost:9999/words", authHeader).then(response => {

            //console.log(response.data)

            this.setState({
                words: response.data
            })

            if (response.status == 200) {


            }


        })
    }



    render() {

        //Only admin users can edit or delete word so  buttons for same would be disabled for normal user

        let isAdmin = true;
        this.state.userObject = this.props.location.state.user

        if (this.state.userObject.roles.includes('ROLE_ADMIN'))
            isAdmin = true
        this.getAllWords()

        return (
            <div>
                <div className="container">
                    <div className="row">


                        <h3 className="mx-auto py-5">All words are listed below :</h3>
                        <div className="col-12 mx-auto">
                            <div className="card shadow" style={{ borderRadius: "10px" }}>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {
                                            this.state.words.map(wordsObj => {
                                                return <div key={wordsObj.word}>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <Link key={wordsObj.word} to={{
                                                            pathname: '/meaning',
                                                            state: {
                                                                'word': wordsObj,
                                                            }
                                                        }}><h3>{wordsObj.word}</h3></Link>
                                                        {
                                                            isAdmin &&
                                                            <div>
                                                                <Link to={{
                                                                    pathname: '/addNewWord',
                                                                    state: {
                                                                        'word': wordsObj,
                                                                        'user': this.state.userObject,
                                                                        'update':1
                                                                    }
                                                                }}>
                                                                    <button className="btn btn-outline-primary  btn-sm"><FontAwesomeIcon icon="edit" className="mr-2" />Update</button>
                                                                </Link>
                                                                <button className="btn btn-outline-danger btn-sm ml-2" onClick={() => { this.handleDelete(wordsObj) }}><FontAwesomeIcon icon="trash" className="mr-2" />Delete</button>
                                                            </div>
                                                        }
                                                    </li>
                                                </div>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordListComponent;











