import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus} from "@fortawesome/free-solid-svg-icons";


library.add(faPlus);

class addNewWordComponent extends Component {

    constructor(props) {
        super(props)
        const obj = this.props.location.state.word
        //console.log(obj)
        let word="";
        let desc="";
        let imageurls=[];
        if(obj!=undefined){
            word = obj.word ?? ''
            desc = obj.description ?? ''
            imageurls = obj.urls.join(';') ?? ''
        }    
        this.state = {
            word: word,
            description: desc,
            images: imageurls,
            userObject: '',
            update:0,
            updateButton:'Add Word'
        }

    }


    updateState = (input) => {
        let text = input.target.value
        let name = input.target.name

        console.log("Inside update : " + text + " " + name)
        this.setState({
            [name]: text
        })
    }


    handleSubmit = () => {

        console.log(this.state.word + " " + this.state.description + " " + this.state.images)
        let addWordPayLoad = {
            word: this.state.word,
            description: this.state.description,
            urls: this.state.images.split(';')
        }
        const authHeader={headers:{Authorization: this.state.userObject.tokenType+' '+this.state.userObject.accessToken}};

        
        console.log(addWordPayLoad);
        if(this.state.update==1){
            axios.post("http://localhost:9999/wordsedit", addWordPayLoad, authHeader).then(response => {

                console.log(response.data)

                if (response.status == 200) {
                    this.props.history.push('/displayWords', {'user': this.state.userObject})
                }


            })
        }
        else{
            axios.post("http://localhost:9999/words", addWordPayLoad, authHeader).then(response => {

                console.log(response.data)

                if (response.status == 200) {
                    this.props.history.push('/displayWords', {'user': this.state.userObject})
                }


            })
        }
    }





    render() {
        this.state.userObject = this.props.location.state.user
        this.state.update=this.props.location.state.update

        //this component is reused when admin clicks on edit word so if edit word is clikcked the data is prepopulated
        if(this.state.update==1)
            this.state.updateButton='Edit Word'
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <h3 className="mx-auto py-4">{this.state.updateButton}</h3>
                            <div className="card shadow" style={{ borderRadius: "10px" }}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Enter word name : </label>
                                        <input type="text" className="form-control" placeholder="Enter Word" name="word" onChange={this.updateState}
                                            defaultValue={this.state.word} />
                                    </div>

                                    <div className="form-group">
                                        <label>Enter word meaning : </label>
                                        <input type="text" className="form-control" placeholder="Enter meaning" name="description" onChange={this.updateState} defaultValue={this.state.description} />
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Image Urls separated with ; as delimeter : </label>
                                        <textarea className="form-control" name="images" onChange={this.updateState}
                                            defaultValue={this.state.images} style={{height:"100px"}}>
                                        </textarea>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={this.handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon="plus" className="mr-2" />{this.state.updateButton}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default addNewWordComponent;
