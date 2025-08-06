import React from 'react';
import LoginCard from '../components/features/Authentication/LoginCard';

const Login:React.FC=() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <LoginCard/>
    </div>
  );
}
export default Login;