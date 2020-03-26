import React, {useState} from 'react';
import Head from 'next/head'
import bcrypt from 'bcryptjs';
import UserForm from '../components/UserForm.js';
import LoginForm from '../components/LoginForm.js';


function Login (props) {
  const [loginForm, setLoginForm] = useState(true);

  const addUserFunction = (userToAdd) => {
    console.log(`Add User: ${userToAdd.email} --> need hook`);
  };

  const processLoginFunction = (userDetails) => {
    // Load hash from your password DB.
    let hash = '$2a$10$jGONMK1/ZWyzILpEgumLHutAQ9nhyHORWQ73Mmb9Hq.VaXEHsgngi';
    if (bcrypt.compareSync(userDetails.password, hash)) {
      console.log(`Logged in: ${userDetails.username}`);
    } else {
      console.log('Login failed.')
    }
  };

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
