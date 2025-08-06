import { Link } from "react-router-dom";
import LoginHeader from "../../layouts/Login/LoginHeader";
import LoginForm from "./LoginForm";
import SocialButton from "./SocialButton";

const LoginCard = () => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
        <LoginHeader />
        <LoginForm />
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-sm text-gray-400 bg-gray-800/50 rounded-full">
            Or continue with
          </span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        <div className="flex space-x-5 mb-8">
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          © 2025 TatvaSoft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
