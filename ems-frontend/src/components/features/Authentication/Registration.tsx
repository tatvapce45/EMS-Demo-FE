import React, { useState } from "react";
import RegistrationHeader from "../../layouts/Login/RegistrationHeader";
import RegistrationStepIndicator from "./RegistrationStepIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import LocationInfoStep from "./LocationInfoStep";

interface EmployeeRegistrationProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  age: string;
  salary: string;
  address: string;
  zipcode: string;
  position: string;
  userName: string;
  hiringDate: string;
  departmentId: string;
  countryId: string;
  stateId: string;
  cityId: string;
  reportsTo: string;
  image: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const EmployeeRegistration: React.FC<EmployeeRegistrationProps> = ({
  onBack = () => window.history.back(),
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobileNo: "",
    gender: "",
    age: "",
    salary: "",
    address: "",
    zipcode: "",
    position: "",
    userName: "",
    hiringDate: "",
    departmentId: "",
    countryId: "",
    stateId: "",
    cityId: "",
    reportsTo: "",
    image: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const departments = [
    { id: "1", name: "Engineering" },
    { id: "2", name: "Human Resources" },
    { id: "3", name: "Marketing" },
    { id: "4", name: "Sales" },
    { id: "5", name: "Finance" },
  ];

  const countries = [
    { id: "1", name: "United States" },
    { id: "2", name: "Canada" },
    { id: "3", name: "United Kingdom" },
    { id: "4", name: "Australia" },
  ];

  const states = [
    { id: "1", name: "California", countryId: "1" },
    { id: "2", name: "New York", countryId: "1" },
    { id: "3", name: "Ontario", countryId: "2" },
    { id: "4", name: "London", countryId: "3" },
  ];

  const cities = [
    { id: "1", name: "Los Angeles", stateId: "1" },
    { id: "2", name: "San Francisco", stateId: "1" },
    { id: "3", name: "New York City", stateId: "2" },
    { id: "4", name: "Toronto", stateId: "3" },
  ];

  const managers = [
    { id: "1", name: "John Smith - Engineering Manager" },
    { id: "2", name: "Sarah Johnson - HR Director" },
    { id: "3", name: "Mike Davis - Marketing Lead" },
    { id: "4", name: "Lisa Wilson - Sales Director" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: "" }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.userName.trim())
        newErrors.userName = "Username is required";
      if (!formData.mobileNo.trim())
        newErrors.mobileNo = "Mobile number is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (
        !formData.age ||
        parseInt(formData.age) < 18 ||
        parseInt(formData.age) > 100
      ) {
        newErrors.age = "Age must be between 18 and 100";
      }
    }

    if (step === 2) {
      if (!formData.position.trim())
        newErrors.position = "Position is required";
      if (!formData.departmentId)
        newErrors.departmentId = "Department is required";
      if (!formData.salary || parseFloat(formData.salary) <= 0) {
        newErrors.salary = "Please enter a valid salary";
      }
      if (!formData.hiringDate)
        newErrors.hiringDate = "Hiring date is required";
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.countryId) newErrors.countryId = "Country is required";
      if (!formData.stateId) newErrors.stateId = "State is required";
      if (!formData.cityId) newErrors.cityId = "City is required";
      if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    // try {
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 2000));

    //   console.log('Employee registration data:', formData);
    //   onSuccess();
    // } catch (error) {
    //   setErrors({ submit: 'Registration failed. Please try again.' });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const renderPersonalInfo = () => (
    <PersonalInfoStep
      imagePreview={imagePreview}
      removeImage={removeImage}
      handleImageChange={handleImageChange}
      errors={errors}
      formData={formData}
      handleInputChange={handleInputChange}
    />
  );

  const renderProfessionalInfo = () => (
    <ProfessionalInfoStep
      errors={errors}
      formData={formData}
      handleInputChange={handleInputChange}
      departments={departments}
      managers={managers}
    />
  );

  const renderLocationInfo = () => (
    <LocationInfoStep
      errors={errors}
      formData={formData}
      handleInputChange={handleInputChange}
      countries={countries}
      states={states}
      cities={cities}
    />
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderProfessionalInfo();
      case 3:
        return renderLocationInfo();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 transform hover:scale-[1.01] transition-all duration-300">
          <RegistrationHeader onBack={onBack} currentStep={currentStep} />

          <RegistrationStepIndicator currentStep={currentStep} />

          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}

            {errors.submit && (
              <div className="mt-6">
                <p className="text-red-500 text-sm text-center animate-pulse">
                  {errors.submit}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
