/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

export default class FbLogin extends Component {
  render() {
    return (
      <FacebookLogin
        appId="3049375291084190"
        onSuccess={(response) => {
          this.props.auth.signin(response.accessToken);
        }}
        onFail={() => {
          // handling error
        }}
        onProfileSuccess={() => {
          // console.log('Get Profile SUCCESS!', response);
        }}
      />
    );
  }
}