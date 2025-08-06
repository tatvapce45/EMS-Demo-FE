export const getEmailError = (email: string): string | null => {
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    return null;
};

export const getPasswordError = (password: string): string | null => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[a-z]/.test(password)) return "Must contain at least one lowercase letter.";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter.";
    if (!/\d/.test(password)) return "Must contain at least one number.";
    if (!/[^A-Za-z\d]/.test(password)) return "Must include one special character.";
    return null;
};
