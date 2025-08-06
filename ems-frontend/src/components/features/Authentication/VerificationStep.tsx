import { Mail, RefreshCw, Smartphone } from "lucide-react";
import type { VerificationType } from "./types";
import OTPInput from "./OTPInput";

interface VerificationStepProps {
  type: VerificationType;
  otp: string[];
  maskedContact: string;
  isLoading: boolean;
  error: string;
  canResend: boolean;
  timeLeft: number;
  onOTPChange: (index: number, value: string, type: VerificationType) => void;
  onBulkOTPChange: (otpArray: string[], type: VerificationType) => void;
  onVerify: () => void;
  onResend: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  type,
  otp,
  maskedContact,
  isLoading,
  error,
  canResend,
  timeLeft,
  onOTPChange,
  onBulkOTPChange,
  onVerify,
  onResend,
}) => {
  const stepClasses = {
    email: {
      badge: "bg-blue-50 dark:bg-blue-900/20",
      icon: "text-blue-600 dark:text-blue-400",
      text: "text-blue-600 dark:text-blue-400",
      button:
        "from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500/25",
    },
    sms: {
      badge: "bg-green-50 dark:bg-green-900/20",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-600 dark:text-green-400",
      button:
        "from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:ring-green-500/25",
    },
  };

  const classes = stepClasses[type];
  const isEmail = type === "email";
  const Icon = isEmail ? Mail : Smartphone;
  const stepTitle = isEmail ? "Email Verification" : "SMS Verification";
  const contactType = isEmail ? "email" : "SMS";
  const buttonText = isEmail ? "Verify Email Code" : "Complete Verification";
  const loadingText = isEmail ? "Verifying Email..." : "Verifying SMS...";
  const isOTPComplete = otp.join("").length === 6;

  return (
    <>
      <div className="text-center mb-6">
        <div
          className={`inline-flex items-center px-4 py-2 ${classes.badge} rounded-full mb-4`}
        >
          <Icon className={`w-4 h-4 mr-2 ${classes.icon}`} />
          <span className={`text-sm font-medium ${classes.text}`}>
            {stepTitle}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-gray-200">{maskedContact}</span>
        </p>
      </div>
      <OTPInput otp={otp} type={type} error={error} onChange={onOTPChange} onBulkOTPChange={onBulkOTPChange} />
      <button
        onClick={onVerify}
        disabled={isLoading || !isOTPComplete}
        className={`w-full bg-gradient-to-r ${classes.button} disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed flex items-center justify-center mb-4`}
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            {loadingText}
          </>
        ) : (
          buttonText
        )}
      </button>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2">
          Didn't receive the {contactType} code?
        </p>
        {canResend ? (
          <button
            onClick={onResend}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
          >
            Resend {contactType} Code
          </button>
        ) : (
          <p className="text-gray-400 text-sm">
            Resend in {timeLeft}s
          </p>
        )}
      </div>
    </>
  );
};

export default VerificationStep;
