export interface ServiceResponse<T> {
    success: boolean;
    statusCode: number;
    message?: string;
    validationErrors?: string[];
    errorDetail?: string;
    data?: T;
}
