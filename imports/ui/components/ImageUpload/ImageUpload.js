import React, {Component} from 'react';
import './styles.css';

class ImageUpload extends Component {

  handleFileSelect = (e) => {
    e.preventDefault();
    this.refs.fileSelect.click();
  }

  render() {
    
    console.log("Render")
    console.log(this.props);
    console.log("this.props.imageurl: ", this.props.imgURL)
    

    return (
      <div>
        <div className="image_border">
          {this.props.error ? <p className="signup_error">{this.props.error}</p> : null}
          <div className="image_container">
            <div className="dropbox">
              <i className="fas fa-image" aria-hidden="true"></i>
              <p> Your Image Will Appear Here </p>
            </div>
            <div className="preview" hidden>
            </div>
          </div>
          <button className="image_upload_button" onClick={this.handleFileSelect}> Upload A Photo</button>
        </div>
        <input type="file" onChange={this.props.changed} hidden ref="fileSelect"/>
      </div>
    );
  }
};

export default ImageUpload;
