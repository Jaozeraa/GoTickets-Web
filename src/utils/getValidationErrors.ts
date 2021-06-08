import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getValidationErrors = (err: ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    const errorPath = error.path;

    if (errorPath) {
      validationErrors[errorPath] = error.message;
    }
  });

  return validationErrors;
};

export default getValidationErrors;