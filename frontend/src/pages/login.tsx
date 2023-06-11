import React from 'react';
import { NextPage } from 'next';
import LoginForm from '~/components/authentication/LoginForm';
import Head from 'next/head';

const login: NextPage = () => {
  <Head>
    <style>{`
    body {
      background-image: url('/bg.jpeg')
    }
  `}</style>
  </Head>;
  return (
    <div className='container-fluid text-center mt-4'>
      <h1 className='fw-500 h1 text-white'>Notes App</h1>
      <LoginForm />
    </div>
  );
};

export default login;
