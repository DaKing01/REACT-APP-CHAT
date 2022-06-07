import './Register.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

function App() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const validateForm = (username, password) => {
    if (username == "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (password == "") {
      toast.error("Password is required.", toastOptions);
      return false;
    } else if (email == "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = validateForm(username, password);    
    if(data == true){
      toast.success("Login Successful.", toastOptions);

      const { dataa } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (dataa.status === false) {
        toast.error(dataa.msg, toastOptions);
      }
      if (dataa.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(dataa.user)
        );
      }
    }
    if(data == false){
      toast.error(toastOptions);
    }

    console.log('Username 👉️', username);
    console.log('Passowrd 👉️', password);
    console.log('Email 👉️', password);

    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <>
    <FormContainer>
    <div className="App">
      <header className="App-header">
      <h1>Spark Flow</h1>
      <form onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={event => setUsername(event.target.value)}
            value={username}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
            min="3"
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            min="3"
          />
          <button type="submit">Sign up</button>
          <span>
            Have an account? <a href="/">Log In</a>
          </span>
        </form>
      </header>
    </div>
    
    </FormContainer>
    <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0b0a15;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default App;
