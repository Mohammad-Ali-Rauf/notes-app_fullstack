import React from 'react';
import { NextPage } from 'next';
import LoginForm from '~/components/authentication/LoginForm';
import Layout from '~/components/layout/Layout';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notes App | Login</title>
      </Head>
      <Layout>
        <div
          className='container-fluid d-flex justify-content-center'
          style={{ height: '100vh' }}
        >
          <div className='text-center mt-4'>
            <h1 className='fw-500 h1 text-white'>Notes App</h1>
            <LoginForm />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
