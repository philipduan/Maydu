import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { lchmod } from 'fs';

class SignUp extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    console.log('submit clicked');
    console.log('PASS: ', this.refs.password.value);
    console.log('otherrefs: ', this.refs);
    Accounts.createUser({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      profile: {
        fullName: this.refs.fullname.value,
        photo: this.refs.photo.value,
        major: this.refs.major.value,
        year: this.refs.year.value,
        bio: this.refs.bio.value
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="email" name="email" type="email" placeholder="email" />
          <input
            ref="username"
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            ref="password"
            name="password"
            type="password"
            placeholder="password"
          />
          <input
            ref="fullname"
            name="fullname"
            type="text"
            placeholder="fullname"
          />
          <input ref="photo" name="photo" type="text" placeholder="Photo url" />
          <input
            ref="major"
            name="major"
            type="text"
            placeholder="Your Major"
          />
          <input ref="year" name="year" type="text" placeholder="Year" />
          <input ref="bio" name="bio" type="text" placeholder="Bio" />
          <button>Submit </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
