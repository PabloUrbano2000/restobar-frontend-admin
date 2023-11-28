/* eslint-disable no-useless-escape */
import {
  birthDateRegex,
  cellphoneRegex,
  descripRegex,
  emailRegex,
  namesExtendRegex,
  namesRegex,
  numberRegex,
  rucRegex,
} from "./regex";

export const formatEmail = () => ({
  func: (value: string) =>
    emailRegex.test(value) && !value.match(/@facebook.com/),
  error: "Correo electrónico Inválido",
});

export const formatDocument = () => ({
  func: (value: string) =>
    !value.match(/00000000|12345678/) &&
    /^(?:\d{8}|[a-zA-Z0-9]{9,15})$/.test(value),
  error: "Formato inválido",
});

export const formatExceedDate = () => ({
  func: (value: string) =>
    value === "" || new Date(value).getTime() <= new Date().getTime(),
  error: "La fecha excede a la fecha actual",
});

export const formatPass = () => ({
  func: (value: string) => value.length >= 8,
  error: "Mínimo 8 caracteres",
});
export const formatNames = () => ({
  func: (value: string) => value === "" || namesRegex.test(value),
  error: "Formato inválido, solo letras",
});

export const formatExtendNames = () => ({
  func: (value: string) => value === "" || namesExtendRegex.test(value),
  error: "Formato inválido.",
});

export const formatRuc = () => ({
  func: (value: string) => value === "" || rucRegex.test(value),
  error: "Formato inválido.",
});

export const formatTax = () => ({
  func: (value: any) => {
    if (value) {
      if (value >= 0.01 && value <= 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  error: "El IGV debe ser mayor a cero o menor igual a uno",
});

export const betweenNumber = (min = 0, max = 1) => ({
  func: (value: any) => {
    if (value) {
      if (value >= min && value <= max) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  error: `Debe ser mayor a ${min} y menor igual a ${max}`,
});

export const minNumber = (number = 0) => ({
  func: (value: any) => {
    if (value) {
      if (value >= number) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  error: `El valor mínimo no puede ser ${number} o menor.`,
});

export const formatURL = () => ({
  func: (value: string) =>
    value === "" ||
    /(\w+):\/\/(([\w]+)@|(\w+):(\w+)@|)((.*)\.|)([\w\-]+)\.((\w{3}\.\w{2})|(\w{3}))(:([0-9]+)|)\/(([\w\/\.]+|)(\?([\w\=\%\&]+)|)(\#(.*)|)|)/.test(
      value
    ),
  error: "Formato inválido.",
});

export const formatSecondLastName = () => ({
  func: (value: string) =>
    value === "" || (value.length >= 2 && namesRegex.test(value)),
  error: "Formato inválido, solo letras",
});

export const formatPhone = () => ({
  func: (value: string) =>
    value === "" || (value.length >= 7 && numberRegex.test(value)),
  error: "Formato inválido. Solo números",
});

export const formatDate = () => ({
  func: (value: any) => value === "" || (value && birthDateRegex.test(value)),
  error: "El formato de la fecha es incorrecto.",
});

const calculateAge = (date: Date) => {
  const birthday = new Date(date);
  const currentDate = new Date();

  const time = Math.floor(
    (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365
  );
  return time;
};

export const minBirthDay = () => ({
  func: (value: any) => value === null || calculateAge(value) > 17,
  error: "No cumple con la edad mínima",
});

export const maxBirthDay = () => ({
  func: (value: any) => value === null || calculateAge(value) < 100,
  error: "¿Está seguro que tiene esa edad?",
});

export const formatCellphone = () => ({
  func: (value: string) => cellphoneRegex.test(value),
  error: "Formato inválido.",
});

export const acceptCheckTerms = () => ({
  func: (value: any) => value !== "1",
  error:
    "Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones",
});

export const acceptCheckTermsPay = () => ({
  func: (value: any) => value === "no",
  error:
    "Para continuar con le proceso de pago es necesario aceptar las condiciones de servicio y las políticas de privacidad",
});

export const formatDescription = () => ({
  func: (value: string) =>
    value === "" || (value.length >= 2 && descripRegex.test(value)),
  error: "Contiene caracteres no permitidos",
});

export const formatCvv = () => ({
  func: (value: string) => /^(\d{3,4})/.test(value),
  error: "Mínimo 3 caracteres",
});

export const formatExpire = () => ({
  func: (value: string) =>
    /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
  error: "Formato inválido",
});
