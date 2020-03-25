import React, {useState} from 'react';
import Head from 'next/head'
import bcrypt from 'bcryptjs';
import UserForm from '../components/UserForm.js';
import LoginForm from '../components/LoginForm.js';


function Register (props) {
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
      </Head>

      <main>
        <h1 className="title">
          {loginForm?<>Sign in to</>:<>Join</>} <a href="#">Food Truckr</a>
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
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
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

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        /* General button style (reset) */
        .btn {
          border: 1px solid #0070f3;
          color: #fff;
          font-family: inherit;
          font-size: inherit;
          background: #0070f3;
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
          color: #0070f3;
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

export default Register;
