import HttpStatus from 'http-status';

export const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
});
  
export const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

export const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
};