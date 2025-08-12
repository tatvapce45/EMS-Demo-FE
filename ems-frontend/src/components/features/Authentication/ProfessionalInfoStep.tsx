import { Calendar } from "lucide-react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InputField from "../../ui/InputFields/InputField";
import SelectField from "../../ui/InputFields/SelectField";
import type { EmployeeRegistrationModel } from "../../../models/Auth/EmployeeRegistrationModel";

interface FormErrors {
  [key: string]: string;
}

interface ProfessionalInfoStepProps {
  errors: FormErrors;
  formData: EmployeeRegistrationModel;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  positions: { id: string; name: string; shortName: string }[];
  departments: { id: string; name: string }[];
  managers: { id: string; name: string }[];
}

const ProfessionalInfoStep: React.FC<ProfessionalInfoStepProps> = ({
  errors,
  formData,
  handleInputChange,
  positions,
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
        <SelectField
          label="Select Position *"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          options={positions.map((c) => ({
            value: c.shortName,
            label: c.name,
            shortName: c.shortName,
          }))}
          error={errors.position}
          placeholder="Select Position *"
        />

        <SelectField
          label="Select Department *"
          name="departmentId"
          value={formData.departmentId}
          onChange={handleInputChange}
          options={departments.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.departmentId}
          placeholder="Select Department *"
        />

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

        <SelectField
          label="Reports To (Manager)"
          name="reportsTo"
          value={formData.reportsTo}
          onChange={handleInputChange}
          options={managers.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.reportsTo}
          placeholder="Select Reports To(Manager) *"
          disabled={formData.position=="CEO"}
        ></SelectField>
      </div>
    </div>
  );
};

export default ProfessionalInfoStep;
