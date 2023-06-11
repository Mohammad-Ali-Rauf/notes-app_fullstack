import React from 'react';
import { NextPage } from 'next';
import RegisterForm from '~/components/authentication/RegisterForm';

const register: NextPage = () => {
  return (
    <RegisterForm />
  )
}

export default register;