import { useMemo } from "react";
import { useState, useEffect } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setformState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setformState( initialForm)
  },[initialForm])

  const onInputChange = ({ target }) => {
    //desestructuracion name y value de target
    const { name, value } = target;
    setformState({
      ...formState,
      [name]: value, //Propiedades computadas lo que este
      //se añade a lo que este en el main lo que esta en el valueAlejandro Solis
    });
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setformValidation(formCheckedValues);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onResetForm = () => {
    setformState(initialForm);
  };

  return {
    ...formState, //para poder sacar los campos desde el useForm
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  };
};
