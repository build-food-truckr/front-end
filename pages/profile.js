import React, {useState, useEffect} from 'react';
import Router from 'next/router'
import axios from 'axios'
import cookies from 'next-cookies'
import { withAuthSync } from '../utils/auth'

const apiProtocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const apiBaseURL = `${apiProtocol}://localhost:5000/api`;
const apiRegister = `${apiBaseURL}/auth/register`;
const apiUser = `${apiBaseURL}/users/diners/`;

const Profile = props => {
  const { isLoggedIn, username, token, userId } = props;
  console.log(props);

  const [user, setUser] = useState({username: username, email: '', id: userId, role: ''});

  useEffect(()=>{
    console.log(`Get call: ${apiUser}${userId}`);
    axios.get(`${apiUser}${userId}`, {
      withCredentials: true
      })
      .then(res=>setUser(res.data))
      .catch(err=>console.log(err))
  },[]);

  if (!token) {
    Router.push('/login')
  }

  return (
    <div>
      <h1>{username}</h1>
      <p className='lead'>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.id}</p>

      <style jsx>{`
        h1 {
          margin-bottom: 0;
        }
        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }
        p {
          color: #6a737d;
        }
      `}</style>
    </div>
  )
}

Profile.getInitialProps = async function(ctx) {

  const { isLoggedIn, username, authToken, userId } = cookies(ctx);

  if (!isLoggedIn || !authToken) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!authToken) {
    Router.push('/login')
  }

  return {
    isLoggedIn: isLoggedIn || false,
    username: username || '',
    token: authToken || undefined,
    userId: userId || undefined
  }
}

export default Profile
