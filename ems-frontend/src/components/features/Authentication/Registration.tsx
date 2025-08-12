import React, { useEffect, useState } from "react";
import RegistrationHeader from "../../layouts/Login/RegistrationHeader";
import RegistrationStepIndicator from "./RegistrationStepIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import LocationInfoStep from "./LocationInfoStep";
import type { EmployeeRegistrationModel } from "../../../models/Auth/EmployeeRegistrationModel";
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import {
  createEmployee,
  getEmployees,
} from "../../../services/employeeService";
import { getDepartments } from "../../../services/departmentService";
import {
  getCities,
  getCountries,
  getStates,
} from "../../../services/geoService";

interface EmployeeRegistrationProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const EmployeeRegistration: React.FC<EmployeeRegistrationProps> = ({
  onBack = () => window.history.back(),
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EmployeeRegistrationModel>({
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
  const [departments, setDepartments] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [countries, setCountries] = useState<{ id: string; name: string }[]>(
    []
  );
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountries();
        setCountries(countryData.data.countriesDtos);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await getDepartments();
        setDepartments(departmentData.data.departmentDtos);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getEmployees();
        setEmployees(employeeData.data.employeeDtos);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!formData.position) {
      setManagers([]);
      return;
    }

    const currentPos = positions.find((p) => p.shortName === formData.position);
    const currentLevel = currentPos ? Number(currentPos.id) : 0;

    const availableManagers = employees.filter((emp) => {
      const empLevel = positions.find((p) => p.shortName === emp.position)?.id;
      return empLevel && Number(empLevel) > currentLevel;
    });

    setManagers(availableManagers);
    setFormData((prev) => ({ ...prev, reportsTo: "" }));
  }, [formData.position, employees]);

  useEffect(() => {
    if (formData.countryId) {
      const fetchStates = async () => {
        try {
          const stateData = await getStates(formData.countryId);
          setStates(stateData.data.statesDtos || []);
          setFormData((prev) => ({
            ...prev,
            stateId: "",
            cityId: "",
          }));
          setCities([]);
        } catch (error) {
          console.error("Error fetching states:", error);
          setStates([]);
        }
      };

      fetchStates();
    } else {
      setStates([]);
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        stateId: "",
        cityId: "",
      }));
    }
  }, [formData.countryId]);

  useEffect(() => {
    if (formData.stateId) {
      const fetchCities = async () => {
        try {
          const cityData = await getCities(formData.stateId);
          setCities(cityData.data.citiesDtos || []);
          setFormData((prev) => ({
            ...prev,
            cityId: "",
          }));
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      };

      fetchCities();
    } else {
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        cityId: "",
      }));
    }
  }, [formData.stateId]);

  const genders = [
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ];

  const positions = [
    { id: "1", name: "Trainee", shortName: "Trainee" },
    { id: "2", name: "Trainee Software Engineer", shortName: "TSE" },
    { id: "3", name: "Software Engineer", shortName: "SE" },
    { id: "4", name: "Senior Software Engineer", shortName: "SSE" },
    { id: "5", name: "Team Lead", shortName: "TL" },
    { id: "6", name: "Associate Project Manager", shortName: "APM" },
    { id: "7", name: "Project Manager", shortName: "PM" },
    { id: "8", name: "Progremme Manager", shortName: "PgM" },
    { id: "9", name: "Vice President", shortName: "VP" },
    { id: "10", name: "Cheif Engineering Officer", shortName: "CEO" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
  
      if (formData.position.trim() !== "CEO" && !formData.reportsTo) {
        newErrors.reportsTo = "Manager is required unless position is CEO";
      }
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
    setErrors({});

    try {
      const data = new FormData();
      data.append("Name", formData.name);
      const date = new Date(formData.hiringDate);
      const localDate = date.toISOString().split("T")[0];
      data.append("HiringDate", localDate);

      data.append("DepartmentId", String(formData.departmentId));
      data.append("Email", formData.email);
      data.append("MobileNo", formData.mobileNo);
      data.append("Gender", formData.gender);
      data.append("Age", String(formData.age));
      data.append("Salary", String(formData.salary));
      data.append("Address", formData.address);
      data.append("Zipcode", formData.zipcode);
      data.append("CountryId", String(formData.countryId));
      data.append("StateId", String(formData.stateId));
      data.append("CityId", String(formData.cityId));
      data.append("Position", formData.position);
      data.append("UserName", formData.userName);
      data.append("RoleId", String(3));
      if (formData.reportsTo) {
        data.append("ReportsTo", String(formData.reportsTo));
      }
      if (formData.image) {
        data.append("ImageFile", formData.image);
      }

      const response = await createEmployee(data);
      console.log("✅ Employee created:", response.data);
    } catch (error: any) {
      console.error(
        "❌ Error creating employee:",
        error.response?.data.message || error.message
      );
      setErrors({
        submit: error.response?.data.message || "Registration failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <PersonalInfoStep
      imagePreview={imagePreview}
      removeImage={removeImage}
      handleImageChange={handleImageChange}
      errors={errors}
      formData={formData}
      handleInputChange={handleInputChange}
      genders={genders}
    />
  );

  const renderProfessionalInfo = () => (
    <ProfessionalInfoStep
      errors={errors}
      formData={formData}
      handleInputChange={handleInputChange}
      positions={positions}
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

          <form>
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
                  className="px-6 py-3 border-2  border-gray-600 text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-900 hover:to-purple-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-800 to-blue-800 hover:from-green-900 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:cursor-not-allowed flex items-center"
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
