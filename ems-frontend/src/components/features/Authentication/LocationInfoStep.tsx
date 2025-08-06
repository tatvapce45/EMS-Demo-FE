import InputField from "../../ui/InputFields/InputField";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SelectInput from "../../ui/InputFields/SelectField";
import { MapPin } from "lucide-react";
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

interface LocationInfoStepProps {
  errors: FormErrors;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  countries: { id: string; name: string }[];
  states: { id: string; name: string; countryId: string }[];
  cities: { id: string; name: string; stateId: string }[];
}

const LocationInfoStep: React.FC<LocationInfoStepProps> = ({
  errors,
  formData,
  handleInputChange,
  countries,
  states,
  cities,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Location Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Where are you located?
        </p>
      </div>

      <div className="space-y-6">
        <InputField
          label="Address *"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          placeholder="Enter your address"
          icon={<MapPin className="w-5 h-5 text-gray-400" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Country *"
            name="countryId"
            value={formData.countryId}
            onChange={handleInputChange}
            options={countries.map((c) => ({ value: c.id, label: c.name }))}
            error={errors.countryId}
          />

          <SelectInput
            label="State *"
            name="stateId"
            value={formData.stateId}
            onChange={handleInputChange}
            options={
              formData.countryId
                ? states
                    .filter((state) => state.countryId === formData.countryId)
                    .map((s) => ({ value: s.id, label: s.name }))
                : []
            }
            error={errors.stateId}
            disabled={!formData.countryId}
          />

          <SelectInput
            label="City *"
            name="cityId"
            value={formData.cityId}
            onChange={handleInputChange}
            options={
              formData.stateId
                ? cities
                    .filter((city) => city.stateId === formData.stateId)
                    .map((c) => ({ value: c.id, label: c.name }))
                : []
            }
            error={errors.cityId}
            disabled={!formData.stateId}
          />

          <InputField
            label="Zip Code *"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            error={errors.zipcode}
            placeholder="Enter zip code"
            icon={<LocationCityIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInfoStep;
