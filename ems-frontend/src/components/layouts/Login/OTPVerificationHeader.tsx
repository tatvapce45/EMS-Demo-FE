import { ArrowLeft, Shield } from "lucide-react";
import type { StepType } from "../../features/Authentication/types";
interface OTPHeaderProps {
    onBack:()=> void;
    currentStep: StepType;
}
const OTPHeader:React.FC<OTPHeaderProps> = ({
    onBack,
    currentStep,
}) => {
  return (
    <div className="text-center mb-8">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-800 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <Shield className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Two-Factor Authentication
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {currentStep === "email"
          ? "Step 1: Verify your email"
          : "Step 2: Verify your phone"}
      </p>
    </div>
  );
};

export default OTPHeader;
