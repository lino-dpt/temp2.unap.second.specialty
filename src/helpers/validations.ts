// Este archivo contiene funciones de validación que se pueden reutilizar en diferentes componentes.
//Vada que el campo no este vacio
export const isRequired = (value: string) => !!value || "Campo Obligatorio.";

//Valida que el campo sea un email
export const isEmail = (value: string) =>
  /.+@.+\..+/.test(value) ? true : "El email debe ser válido.";

//Valida que el campo no supere la longitud maxima
export const maxLength = (value: string, max: number) =>
  value?.length <= max ? true : "Logingitud maxima " + max;

//Valida que el campo sea un numero
export const isNumber = (value: string) =>
  /^[0-9]+$/.test(value) ? true : "Solo se permite números.";

// Validación de DNI (8 dígitos numéricos)
export const isDni = (value: string) =>
  /^[0-9]{8}$/.test(value) ? true : "El DNI debe tener 8 dígitos.";

//validar que sea carne de extranjeria
export const isCE = (value: string) =>
  /^[0-9]{12}$/.test(value)
    ? true
    : "El carnet de extranjeria debe tener 12 dígitos.";

//Validar que sea un numero que permita decimales
export const isDecimal = (value: string) =>
  /^[0-9]+(\.[0-9]+)?$/.test(value) ? true : "Solo se permite números.";
