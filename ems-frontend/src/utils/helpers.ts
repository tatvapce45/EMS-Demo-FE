export const maskEmail = (email: string): string => {
    return email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
  };
  
  export const maskPhone = (phone: string): string => {
    return phone.replace(/(\+\d{1,2}\s?\(\d{3}\))(.*)(\d{4})/, "$1 ***-$3");
  };
  
  export const isValidDigit = (value: string): boolean => {
    return /^\d*$/.test(value);
  };
  
  export const simulateApiCall = (delay: number = 1500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
  
  export const isValidOTP = (otp: string): boolean => {
    return otp === "123456"; // Demo validation
  };