import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const home: NextPage = () => {

    const router = useRouter();

    // const [loading, setLoading] = useState(false);

    useEffect(() => {

        // const handleStart = (url) => (url !== router.asPath) setLoading(true)

        const token = localStorage.getItem('token');

        if(!token) {
            router.replace('/')
        }
    }, [])

    const logout = () => {
      localStorage.removeItem('token')
      router.replace('/')
    }

  return (
    <div>
      Home Page protected
      <button className="btn btn-success" onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default home
