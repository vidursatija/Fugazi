import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginImg from "./lock.svg";
import './style.css';
import Cookies from "js-cookie";
import {BACKEND_URL} from '../constants';


//HTTP module
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default class Login extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      name: '',
      email: '',
      password: '',
      loginErrors: ''
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateForm() {
    return this.email.length > 0 && this.password.length > 0;
  }

  handleSubmit(event) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const { email, password } =  this.state;

    axios
      .post(
        `${BACKEND_URL}/api/auth/login`,
        {
            email: email,
            password: password
        },
        { headers: headers },
        { withCredentials: true }
      )
      .then(response => {
        Cookies.set("access_token", response.data.access_token);
        console.log(Cookies.get("access_token"));
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        console.log('login error', error);
      });
    event.preventDefault();
  }
  handleSignup(event) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const { name, email, password } =  this.state;

    axios
      .post(
        `${BACKEND_URL}/api/auth/signup`,
        {
            name: name,
            email: email,
            password: password,
        },
        { headers: headers },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged) {
          console.log(Cookies.get("access_token"));
          this.props.history.push('/dashboard');
          // this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('signup error', error);
      });
    event.preventDefault();
  }
  btnLogin() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if(signUpButton){
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
    }

    if(signInButton){
      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  render (){
      return (
        <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form onSubmit={this.handleSignup}>
        <h1>Create Account</h1>
        <input type="text" placeholder="Name" />
        <input 
          type="name"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form  onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Sign in to start your video analysis!</p>
          <button class="ghost" id="signIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Join Us</h1>
          <p>Sign up to join the big brother surveillance team.  George Orwell welcomes you.</p>
          <button class="ghost" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
      );
      }
    }
 