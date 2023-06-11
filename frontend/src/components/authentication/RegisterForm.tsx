import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const RegisterForm: NextPage = () => {
  interface Errors {
    name?: string;
    email?: string;
    password?: string;
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.replace('/home');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation
    if (name === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Please enter your name.',
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: '',
      }));
    }

    if (email === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }

    if (password === '' || password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          'Please enter a password, and the password must be at least 6 characters long.',
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }

    try {
      const res = await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        password: password,
      });

      if (res.status >= 200 && res.status < 300) {
        console.log('Registered Successfully!!');

        const token = res.data.token;
        localStorage.setItem('token', token);
      } else if (res.status >= 400 && res.status < 500) {
        console.log('Client-side error occurred.');
      } else if (res.status >= 500 && res.status < 600) {
        console.log('Server-side error occurred.');
      } else {
        console.log('Unexpected error occurred.');
      }

      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
      router.replace('/home');
    } catch (err) {
      console.error({ error: err });
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
      <form
        className='flex-col needs-validation'
        noValidate
        onSubmit={handleSubmit}
      >
        <div className='mb-3'>
          <label
            htmlFor='name'
            style={{ fontSize: '22px' }}
            className='form-label text-white'
          >
            Name
          </label>
          <input
            value={name}
            type='text'
            style={{ width: '300px', fontSize: '22px' }}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id='name'
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <div style={{ width: '300px', fontSize: '22px' }} className='invalid-feedback'>
              {errors.name}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label
            htmlFor='email'
            style={{ fontSize: '22px' }}
            className='form-label text-white'
          >
            Email address
          </label>
          <input
            value={email}
            type='email'
            style={{ width: '300px', fontSize: '22px' }}
            className={`form-control ${
              errors.email ? 'is-invalid' : ''
            } styles[placeholder-color]`}
            id='email'
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <div style={{ width: '300px', fontSize: '22px' }} className='invalid-feedback'>
              {errors.email}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <label
            htmlFor='password'
            style={{ fontSize: '22px' }}
            className='form-label text-white'
          >
            Password
          </label>
          <input
            value={password}
            type='password'
            style={{ width: '300px', fontSize: '22px' }}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id='password'
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {errors.password && (
            <div style={{ width: '300px', fontSize: '22px' }} className='invalid-feedback'>
              {errors.password}
            </div>
          )}
        </div>
        <button type='submit' className='btn btn-light btn-lg mt-2'>
          Register
        </button>

        <h1 className='h4 mt-3'>Already have an account? <Link href='/login' className='fw-bold link-success text-decoration-none'>Login</Link></h1>
      </form>
    </div>
  );
};

export default RegisterForm;
