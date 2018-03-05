import React, {Component} from 'react';
import './styles.css';

class ImageUpload extends Component {

  handleFileSelect = (e) => {
    e.preventDefault();
    this.refs.fileSelect.click();
  }

  render() {
    
    // No image is uploaded
    let imageHolder = (           
       <div className="dropbox">
        <p> Your Image Will Appear Here </p>
      </div>
    );
    let text = "Please Upload a Photo";

    // User uploaded image
    if(this.props.imgURL) {
      let backgroundImage = {
        backgroundImage: `url(${this.props.imgURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }
      imageHolder =(
        <div className="preview" style={backgroundImage}>
        </div>
      );
      text = "Bad pic? Switch it!"
    }

    return (
      <div>
        <div className="image_border">
          {this.props.error ? <p className="signup_error">{this.props.error}</p> : null}
          <div className="image_container">
            {imageHolder}           
          </div>
          <button className="image_upload_button" onClick={this.handleFileSelect}> {text}</button>
        </div>
        <input type="file" onChange={this.props.changed} hidden ref="fileSelect"/>
      </div>
    );
  }
};

export default ImageUpload;
