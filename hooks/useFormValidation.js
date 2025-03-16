import { useState, useCallback } from "react";

// Validation rules
const rules = {
  required: (value) => ({
    valid: value !== undefined && value !== null && value !== "",
    message: "This field is required",
  }),
  email: (value) => ({
    valid: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
    message: "Invalid email address",
  }),
  minLength: (length) => (value) => ({
    valid: value.length >= length,
    message: `Must be at least ${length} characters`,
  }),
  maxLength: (length) => (value) => ({
    valid: value.length <= length,
    message: `Must not exceed ${length} characters`,
  }),
  pattern: (regex, message) => (value) => ({
    valid: regex.test(value),
    message,
  }),
  match: (matchValue, fieldName) => (value) => ({
    valid: value === matchValue,
    message: `Must match ${fieldName}`,
  }),
  url: (value) => ({
    valid: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
      value
    ),
    message: "Invalid URL",
  }),
  phone: (value) => ({
    valid: /^\+?[\d\s-]+$/.test(value),
    message: "Invalid phone number",
  }),
};

const useFormValidation = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      const fieldRules = validationSchema[name];
      if (!fieldRules) return true;

      for (const rule of fieldRules) {
        const validation = rule(value);
        if (!validation.valid) {
          return validation.message;
        }
      }
      return null;
    },
    [validationSchema]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationSchema]);

  // Handle field change
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      // Clear error when field is changed
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    },
    [errors]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      const error = validateField(name, values[name]);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [validateField, values]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);
      const isValid = validateForm();

      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }
      setIsSubmitting(false);
    },
    [validateForm, values]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export default useFormValidation;
