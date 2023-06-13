import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import NoteList from '~/components/notes/NoteList';
config()

const home: NextPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/');
    }

    const decodedToken = jwt.decode(token as string) as JwtPayload
    if(decodedToken) {
      setUserName(decodedToken.name)
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <>
      <Head>
        <title>Notes App | Home</title>
      </Head>
      <nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
        <div className='container-fluid fs-4'>
          <a href='/home' className='navbar-brand fs-2'>
            Notes App
          </a>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item text-light mx-3'>
              <span className='nav-link'>Hello, <span className='fw-bold'>{userName}</span></span>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary btn-lg" onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <NoteList />
    </>
  );
};

export default home;
