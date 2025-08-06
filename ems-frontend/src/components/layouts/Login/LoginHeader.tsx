import { User } from 'lucide-react';

const LoginHeader = () => (
  <div className="text-center mb-8">
    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
      <User className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
      Welcome Back
    </h1>
    <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account to continue</p>
  </div>
);

export default LoginHeader;
