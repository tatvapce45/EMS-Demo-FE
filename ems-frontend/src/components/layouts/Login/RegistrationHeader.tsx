import { ArrowLeft, User } from "lucide-react";
interface RegistrationHeaderProps {
  currentStep: number;
  onBack: () => void;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  currentStep,
  onBack,
}) => {
  return (
    <div className="text-center mb-8 relative">
      <button
        onClick={onBack}
        className="absolute left-0 top-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-800 to-purple-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Employee Registration
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Step {currentStep} of 3 - Complete all sections to register
      </p>
    </div>
  );
};

export default RegistrationHeader;
