import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Router from 'next/router';
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("./index"));
import Head from 'next/head';
import bcrypt from 'bcryptjs';
import cookies from 'next-cookies';
import UserForm from '../components/UserForm.js';
import LoginForm from '../components/LoginForm.js';

//const apiBaseURL = `https://cors-anywhere.herokuapp.com/https://authentication-backend-lambda.herokuapp.com/api`;
const apiBaseURL = `https://authentication-backend-lambda.herokuapp.com/api`;
//const apiBaseURL = 'http://localhost:5000/api'
const apiRegister = `${apiBaseURL}/auth/register`;
const apiLogin = `${apiBaseURL}/auth/login`;

function Login (props) {
  const [loginForm, setLoginForm] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState({});
  const [userId, setUserId] = useState(undefined);

  useEffect(()=>{
    if (loggedIn) {
      Router.replace("/login", "/", { shallow: true });
    }
  },[loggedIn]);

  const addUserFunction = (userToAdd) => {
    console.log(`API Call: ${apiRegister}`)
    console.log(`User to Add: ${userToAdd.username}`);
    axios.post(apiRegister, { username: userToAdd.username, password: userToAdd.password, email: userToAdd.email, role: userToAdd.role},{withCredentials:true})
      .then(response=>{
        console.log(response);
      })
      .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  })
};

  const processLoginFunction = (userDetails) => {
    console.log(userDetails);
    axios.post(apiLogin, { username: userDetails.username, password: userDetails.password})
      .then((response, request)=>{
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        console.log('login.processLoginFunction:Response',response);
        document.cookie = `isLoggedIn=true; path=/`;
        document.cookie = `authToken=${response.data.authToken}; path=/`;
        document.cookie = `username=${userDetails.username}; path=/`;
        setUsername(`${userDetails.username}`);
        setToken(response.data.authToken);
        console.log(response.data.authToken);
        //setUserId(response.cookies.authToken.payload.id);
        setLoggedIn(true);
      })
      .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
}

  if (loggedIn) {
    return <HomePage loggedIn={loggedIn} username={username} token={token} userId={userId} />
  }

  return (
    <div className="container">
      <Head>
        <title>Food Truckr</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
      </Head>


      <main>
        <img src="/foodtruck_graphic.png" alt="Food Truckr" />
        <h1 className="title">
          {loginForm?<>Sign in to</>:<>Join</>} <a href="/">Food Truckr</a>
        </h1>
        <p></p>
        <button className="btn" onClick={()=>setLoginForm(!loginForm)}>{loginForm?<>Not a member yet? Join us here</>:<>Already a member? Login here</>}</button>
        <p></p>
        {loginForm?<LoginForm loginFunction={processLoginFunction} />:<UserForm isEditing={false} addUserFunction={addUserFunction} />}
      </main>
      <footer>
        <a
          href="https://github.com/build-food-truckr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Team FoodTruckr
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          font-family: Roboto;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px dotted #504E50;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Roboto;
          color: #504E50;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          font-family: Roboto;
          color: #504E50;
        }

        .title a {
          color: #EF903C;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        /* General button style (reset) */
        .btn {
          border: 1px solid #EF903C;
          color: #fff;
          font-family: Roboto;
          font-size: inherit;
          background: #EF903C;
          cursor: pointer;
          padding: 15px 40px;
          display: inline-block;
          margin: 15px 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          outline: none;
          position: relative;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          transition: all 0.3s;
        }

        .btn:hover,
        .btn:active {
          color: #EF903C;
          background: #fff;
        }

        .btn:disabled {
          background: darkgrey;
          border: 1px dotted darkgrey;
          color: lightgrey;
        }

        .btn-s {
          padding: 10px 30px;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        img #foodTruckIcon{
          width: 20px;
        }
      `}</style>
    </div>
  );
}

export default Login;
