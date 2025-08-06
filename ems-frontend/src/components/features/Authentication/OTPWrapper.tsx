import { Navigate, useLocation } from "react-router-dom";
import OTPVerification from "./OTPVerification";

const OTPWrapper = () => {
    const location = useLocation();
    const userEmail = location.state?.userEmail;
  
    if (!userEmail) return <Navigate to="/" replace />;
  
    return (
      <OTPVerification
        userEmail={userEmail}
        onBack={() => window.history.back()}
        onVerifySuccess={() => console.log('OTP verified')}
      />
    );
  };
  
  export default OTPWrapper;