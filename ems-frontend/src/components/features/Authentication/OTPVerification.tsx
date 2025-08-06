import { useState } from "react";
import type { StepType, VerificationType } from "./types";
import OTPHeader from "../../layouts/Login/OTPVerificationHeader";
import ProgressIndicator from "./ProgressIndicator";
import VerificationStep from "./VerificationStep";
import { useOTPTimer } from "../../../hooks/useOTPTimer";
import {
  isValidOTP,
  maskEmail,
  maskPhone,
  simulateApiCall,
} from "../../../utils/helpers";

interface OTPVerificationProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  userEmail: string;
}
const OTPVerification: React.FC<OTPVerificationProps> = ({
  onBack,
  onVerifySuccess,
  userEmail,
}) => {
  const [currentStep, setCurrentStep] = useState<StepType>("email");
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [smsOtp, setSmsOtp] = useState(["", "", "", "", "", ""]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailTimer = useOTPTimer();
  const smsTimer = useOTPTimer();

  const userPhone = "+1 (555) 123-4567";
  const maskedEmail = maskEmail(userEmail);
  const maskedPhone = maskPhone(userPhone);

  const handleOtpChange = (
    index: number,
    value: string,
    type: VerificationType
  ) => {
    const newOtp = type === "email" ? [...emailOtp] : [...smsOtp];
    newOtp[index] = value;

    if (type === "email") {
      setEmailOtp(newOtp);
    } else {
      setSmsOtp(newOtp);
    }

    setError("");
  };

  const handleOtpBulkChange = (otpArray: string[], type: VerificationType) => {
    if (type === "email") {
      setEmailOtp(otpArray);
    } else {
      setSmsOtp(otpArray);
    }
  
    setError("");
  };
  

  const resetOTP = (type: VerificationType) => {
    if (type === "email") {
      setEmailOtp(["", "", "", "", "", ""]);
    } else {
      setSmsOtp(["", "", "", "", "", ""]);
    }
  };

  const handleVerifyStep = async (type: VerificationType) => {
    setIsLoading(true);
    setError("");

    const otp = type === "email" ? emailOtp.join("") : smsOtp.join("");

    try {
      await simulateApiCall(1500);

      if (isValidOTP(otp)) {
        if (type === "email") {
          setEmailVerified(true);
          setCurrentStep("sms");
        } else {
          setSmsVerified(true);
          setCurrentStep("complete");
          setTimeout(() => onVerifySuccess(), 1500);
        }
      } else {
        setError("Invalid verification code. Please try again.");
        resetOTP(type);
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async (type: VerificationType) => {
    const timer = type === "email" ? emailTimer : smsTimer;
    timer.startTimer(30);
    resetOTP(type);
    setError("");
    await simulateApiCall(1000);
  };

  if (currentStep === "complete") {
    return <></>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
          <OTPHeader onBack={onBack} currentStep={currentStep} />
          <ProgressIndicator
            currentStep={currentStep}
            emailVerified={emailVerified}
            smsVerified={smsVerified}
          />
          <div className="mb-6">
            {currentStep === "email" ? (
              <VerificationStep
                type="email"
                otp={emailOtp}
                maskedContact={maskedEmail}
                isLoading={isLoading}
                error={error}
                canResend={emailTimer.canResend}
                timeLeft={emailTimer.timeLeft}
                onOTPChange={handleOtpChange}
                onBulkOTPChange={handleOtpBulkChange}
                onVerify={() => handleVerifyStep("email")}
                onResend={() => handleResend("email")}
              />
            ) : (
              <VerificationStep
                type="sms"
                otp={smsOtp}
                maskedContact={maskedPhone}
                isLoading={isLoading}
                error={error}
                canResend={smsTimer.canResend}
                timeLeft={smsTimer.timeLeft}
                onOTPChange={handleOtpChange}
                onBulkOTPChange={handleOtpBulkChange}
                onVerify={() => handleVerifyStep("sms")}
                onResend={() => handleResend("sms")}
              />
            )}
          </div>
          {error && (
            <div className="mb-4">
              <p className="text-red-500 text-sm text-center animate-pulse">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
