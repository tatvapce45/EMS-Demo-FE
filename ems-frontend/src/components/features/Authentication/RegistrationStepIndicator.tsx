import React from "react";

interface RegistrationStepIndicatorProps {
  currentStep: number;
}

const RegistrationStepIndicator: React.FC<RegistrationStepIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                step < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : step === currentStep
                  ? "border-blue-500 text-blue-500 bg-blue-900/20"
                  : "border-gray-600 text-gray-400"
              }`}
            >
              {step < currentStep ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-sm font-semibold">{step}</span>
              )}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-0.5 transition-all duration-300 ${
                  step < currentStep ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationStepIndicator;
