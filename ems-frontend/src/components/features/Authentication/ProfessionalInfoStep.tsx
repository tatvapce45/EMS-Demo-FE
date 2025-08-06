import { Building, Calendar } from "lucide-react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InputField from "../../ui/InputFields/InputField";

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

interface ProfessionalInfoStepProps {
  errors: FormErrors;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  departments: { id: string; name: string }[];
  managers: { id: string; name: string }[];
}

const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
  errors,
  formData,
  handleInputChange,
  departments,
  managers,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Professional Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about the role and department
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Position *"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          error={errors.position}
          placeholder="Enter your position"
          icon={<Building className="w-5 h-5 text-gray-400" />}
        />

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Department *
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors.departmentId
                ? "border-red-300 dark:border-red-600 focus:border-red-500"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-500"
            } text-gray-900 dark:text-white`}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-red-500 text-sm mt-1">{errors.departmentId}</p>
          )}
        </div>

        <InputField
          label="Salary *"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleInputChange}
          error={errors.salary}
          placeholder="Enter your salary"
          icon={<CurrencyRupeeIcon className="w-5 h-5 text-gray-400" />}
        />

        <InputField
          label="Hiring Date *"
          name="hiringDate"
          type="date"
          value={formData.hiringDate}
          onChange={handleInputChange}
          error={errors.hiringDate}
          placeholder="Select hiring date"
          icon={<Calendar className="w-5 h-5 text-gray-400" />}
        />

        {/* Reports To */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Reports To (Manager)
          </label>
          <select
            name="reportsTo"
            value={formData.reportsTo}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 border-gray-200 dark:border-gray-600 focus:border-blue-500 text-gray-900 dark:text-white"
          >
            <option value="">Select Manager (Optional)</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoStep;
