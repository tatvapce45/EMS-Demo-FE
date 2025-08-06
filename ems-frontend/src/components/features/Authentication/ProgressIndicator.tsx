import React from "react";
import { Mail, Smartphone, CheckCircle } from "lucide-react";
import type { StepType } from "./types";

interface ProgressIndicatorProps {
  currentStep: StepType;
  emailVerified: boolean;
  smsVerified: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  emailVerified,
  smsVerified,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            emailVerified
              ? "bg-green-500 border-green-500 text-white"
              : currentStep === "email"
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-gray-600 text-gray-400"
          }
            `}
        >
          {emailVerified ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Mail className="w-5 h-5" />
          )}
        </div>
        <div
          className={`w-12 h-0.5 transition-all duration-300 ${
            emailVerified ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
          }`}
        ></div>

        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            smsVerified
              ? "bg-green-500 border-green-500 text-white"
              : currentStep === "sms"
              ? "border-blue-500 text-blue-500 bg-blue-900/20"
              : "border-gray-600 text-gray-400"
          }`}
        >
          {smsVerified ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Smartphone className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
