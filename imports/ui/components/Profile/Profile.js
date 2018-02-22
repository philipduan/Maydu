import React, { Component } from 'react';
import './styles.css';

class Profile extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="Profile-Container">
                <div className="Header-Placeholder">
                    Header stuff
                </div>
                <div className="Profile-Box-Outer">
                    <div className="Profile-Box">
                        <div className="Profile-Picture">
                            <img src="https://ath.unileverservices.com/wp-content/uploads/sites/4/2016/07/ashton-kutcher-long-hair-brown.jpg" />
                        </div>
                        <a href="#" id="Edit-Profile"> Edit Profile </a>
                        <h3> Carlos Reyes </h3>
                        <h6> {`York University ` + `~ Computer Science` + ` ~ Fourth Year`} </h6>
                        <p> Hi, my name is carlos and overall I'm just a legend.
                            To be more specific, I kill the game when it comes to
                            coding - specifically with javascript. I shred on the
                            slopes and only have 7 toes... true story. Anyways,
                            this is my bio.
                        </p>
                        <h5> My Session's  </h5>
                        <h5> Accepted Sessions </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile; 