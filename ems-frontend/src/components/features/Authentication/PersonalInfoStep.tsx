import { Mail, Phone, Upload, User, X } from "lucide-react";
import InputField from "../../ui/InputFields/InputField";
import SelectField from "../../ui/InputFields/SelectField";
interface FormErrors {
  [key: string]: string;
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

interface PersonalInfoStepProps {
  imagePreview?: string | null;
  removeImage: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  imagePreview,
  removeImage,
  handleImageChange,
  errors,
  formData,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let's start with basic details
        </p>
      </div>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-3">
        <div className="relative">
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <label className="mt-3 cursor-pointer">
          <span className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          label="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Enter full name"
          icon={<User className="w-5 h-5 text-gray-400" />}/>

        <InputField
          label="Email Address *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter email address"
          icon={<Mail className="w-5 h-5 text-gray-400" />}/>

        <InputField
          label="Username *"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          error={errors.userName}
          placeholder="Enter username"
          />

        <InputField
          label="Mobile Number *"
          name="mobileNo"
          type="tel"
          value={formData.mobileNo}
          onChange={handleInputChange}
          error={errors.mobileNo}
          placeholder="Enter mobile number"
          icon={<Phone className="w-5 h-5 text-gray-400" />}/>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.gender
                ? "border-red-300 dark:border-red-600 focus:border-red-500"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-500"
            } text-gray-900 dark:text-white`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>
        {/* <SelectField
          label="Gender *"
          name="genderId"
          value={formData.countryId}
          onChange={handleInputChange}
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.countryId}
        ></SelectField> */}

        <InputField
          label="Age *"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          error={errors.age}
          placeholder="Enter age"
          />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
