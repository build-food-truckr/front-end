import React, {useState} from 'react'
import Head from 'next/head'
import cookies from 'next-cookies'

function Home (props) {
  const [username, setUsername] = useState(props.username);
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);

  console.log(props);

  return (
    <div className="container">
      <Head>
        <title>Food Truckr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="#">Food Truckr</a>
        </h1>

        {isLoggedIn?<h2>Welcome back, {props.username}!</h2>:<></>}

        <div className="grid">

          <a href="/search" className="card">
            <h3>Search &rarr;</h3>
            <p>Get started by searching our Food Trucks near you</p>
          </a>

          {!isLoggedIn?<a href="/login" className="card">
            <h3>Login/Register &rarr;</h3>
            <p>Login and start tracking your favorite Food Trucks</p>
          </a>:<></>}

          <div className="card">
            <h3>Update &rarr;</h3>
            <p> Add new locations</p>
          </div>

        </div>
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
          font-family: Roboto;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: #504E50;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #EF903C;
          border-color: #EF903C;
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
  )
}

Home.getInitialProps = async function(ctx) {
    console.log(cookies(ctx));
    return {
      username: cookies(ctx).username || '',
      loggedIn: cookies(ctx).loggedIn || false
    }
  }

export default Home
