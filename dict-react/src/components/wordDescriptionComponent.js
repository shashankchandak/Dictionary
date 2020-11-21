import React, { Component } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

class WordDescriptionComponent extends Component {

    constructor(props) {
        super(props)

    }


    render() {

        let data = this.props.location.state;
        console.log(data);
 

        const imagesToDisplay = [];
        for (const u of data.word.urls) {
            imagesToDisplay.push({ "url": u })
        }


        return (
            <div>
                <div className="container" >
                    <div className="row">
                        <div className="col-8 mx-auto mt-5">
                            <div className="card shadow" style={{ borderRadius: "10px" }}>
                                <div className="card-body">
                                    <h2 className="mx-auto">{data.word.word}</h2>
                                    <hr style={{ border: "1px solid blue" }}></hr>
                                    <p>{data.word.description}</p>
                                    {/* <img src={data.word.urls} width="100px" height="100px"></img> */}
                                    <SimpleImageSlider
                                        style={{ margin: "0 auto", marginTop: "50px" }}
                                        width={400}
                                        height={300}
                                        images={imagesToDisplay}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordDescriptionComponent;