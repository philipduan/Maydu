import React, {Component} from 'react';
import './styles.css';

class ImageUpload extends Component {

  handleFileSelect = (e) => {
    e.preventDefault();
    this.refs.fileSelect.click();
  }

  render() {
    console.log("REFS: ", this.refs);
    return (
      <div>
        <label className="signup_label"> {this.props.label} </label>
        {this.props.error ? <p className="signup_error">{this.props.error}</p> : null}
        <img className="image" src={this.props.imgURL} />
        <input type="file" onChange={this.props.changed} hidden ref="fileSelect"/>
        <button className="image_upload_button" onClick={this.handleFileSelect}> Upload A Photo</button>
      </div>
    );
  }
};

export default ImageUpload;
