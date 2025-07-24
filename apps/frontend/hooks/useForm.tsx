import { useCallback, useState } from 'react';

interface FieldValidation {
  value: string;
  error: string;
  isValid: boolean;
  showError: boolean;
}

interface FormValidationConfig {
  [fieldName: string]: {
    initialValue?: string;
    validator: (value: string, formValues?: Record<string, string>) => ValidationResult;
    validateOnChange?: boolean;
  };
}

const useForm = (config: FormValidationConfig) => {
  const [fields, setFields] = useState<Record<string, FieldValidation>>(() => {
    const initialFields: Record<string, FieldValidation> = {};

    Object.keys(config).forEach((fieldName) => {
      const initialValue = config[fieldName].initialValue || '';
      initialFields[fieldName] = {
        value: initialValue,
        error: '',
        isValid: initialValue.trim() !== '',
        showError: false,
      };
    });

    return initialFields;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = useCallback(
    (fieldName: string, value?: string, forceShowError: boolean = false): boolean => {
      const fieldConfig = config[fieldName];
      if (!fieldConfig) return true;

      const fieldValue = value !== undefined ? value : fields[fieldName]?.value || '';
      const formValues = getFormValues();
      formValues[fieldName] = fieldValue;

      const validationResult = fieldConfig.validator(fieldValue, formValues);

      // Show error only if submitted or forced, and for non-empty invalid fields
      const shouldShowError = forceShowError || isSubmitted || !validationResult.isValid;

      setFields((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: fieldValue,
          error: validationResult.error,
          isValid: validationResult.isValid,
          showError: shouldShowError && !validationResult.isValid,
        },
      }));

      return validationResult.isValid;
    },
    [config, fields, isSubmitted],
  );

  const updateField = useCallback(
    (fieldName: string, value: string) => {
      const fieldConfig = config[fieldName];

      setFields((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
        },
      }));

      // Validate on change if configured
      if (fieldConfig?.validateOnChange !== false) {
        setTimeout(() => validateField(fieldName, value), 0);
      }
    },
    [config, validateField],
  );

  const validateAllFields = useCallback((): boolean => {
    setIsSubmitted(true);
    let allValid = true;

    Object.keys(config).forEach((fieldName) => {
      const isValid = validateField(fieldName, undefined, true); // Force show errors
      if (!isValid) {
        allValid = false;
      }
    });

    return allValid;
  }, [config, validateField]);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    const resetFields: Record<string, FieldValidation> = {};

    Object.keys(config).forEach((fieldName) => {
      const initialValue = config[fieldName].initialValue || '';
      resetFields[fieldName] = {
        value: initialValue,
        error: '',
        isValid: initialValue.trim() !== '',
        showError: false,
      };
    });

    setFields(resetFields);
  }, [config]);

  const getFormValues = useCallback((): Record<string, string> => {
    const values: Record<string, string> = {};
    Object.keys(fields).forEach((fieldName) => {
      values[fieldName] = fields[fieldName]?.value || '';
    });
    return values;
  }, [fields]);

  const isFormValid = Object.values(fields).every((field) => field.isValid && field.value.trim() !== '');

  return {
    fields,
    updateField,
    validateField,
    validateAllFields,
    isFormValid,
    resetForm,
    getFormValues,
  };
};

export default useForm;
