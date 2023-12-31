// import { DateBody } from "../hooks/useDashboard/types";
// import { OperationType } from "../hooks/useDocumentsType/types";
// import { months } from "./constants";
// import { docPatterns } from "./regex";

type FormatDate = {
  date: string | Date | undefined | null;
  order?: number; // 0 dia-mes-año | 1 año-mes-dia
  separator?: string;
};

export const setFormatDate = ({
  order = 0,
  date,
  separator = "-",
}: FormatDate) => {
  if (date) {
    let year: number | string = "";
    let month: number | string = "";
    let day: number | string = "";
    if (typeof date === "string") {
      year = date.substring(0, 4);
      month = date.substring(5, 7);
      day = date.substring(8, 10);
    }
    if (typeof date === "object") {
      const convertDate = new Date(date);
      year = convertDate ? convertDate.getFullYear() : "";
      month = convertDate ? convertDate.getMonth() + 1 : "";
      if (Number(month) < 10) {
        month = `0${month}`;
      }
      day = convertDate ? convertDate.getDate() : "";
      if (Number(day) < 10) {
        day = `0${day}`;
      }
    }

    if (order === 0) {
      return year && month && day
        ? `${day}${separator}${month}${separator}${year}`
        : "";
    }
    if (order === 1) {
      return year && month && day
        ? `${year}${separator}${month}${separator}${day}`
        : "";
    }
  }
  return "";
};

// type FormatCharacter = {
//   character: string;
//   slice?: number;
//   isSuspent?: boolean;
// };

// export const setFormatCharacters = ({
//   character = "",
//   slice = 50,
//   isSuspent = true,
// }: FormatCharacter): string => {
//   if (character) {
//     if (isSuspent) {
//       return character.length >= slice
//         ? `${character.substring(0, slice - 3)}...`
//         : character;
//     } else {
//       return character.length >= slice
//         ? `${character.substring(0, slice)}`
//         : character;
//     }
//   } else {
//     return "";
//   }
// };

// export const formatRolName = (rol: string) => {
//   switch (rol) {
//     case "user":
//       return "Usuario";
//     case "admin":
//       return "Administrador";
//     case "moderator":
//       return "Moderador";
//     default:
//       return "";
//   }
// };

// export const formatOperationType = (op: string) => {
//   switch (op) {
//     case OperationType.IDENTITY:
//       return "Identificación";
//     case OperationType.TRANSACTION:
//       return "Transacción";
//     default:
//       return "";
//   }
// };

// export const extendedDate = () => {
//   const newDate = new Date();
//   const dateFormat = `${
//     newDate.getDate() + 1 >= 10
//       ? newDate.getDate() + 1
//       : `0${newDate.getDate() + 1}`
//   }-${
//     newDate.getMonth() + 1 >= 10
//       ? newDate.getMonth() + 1
//       : `0${newDate.getMonth() + 1}`
//   }-${newDate.getFullYear()} ${
//     newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`
//   } ${
//     newDate.getMinutes() >= 10
//       ? newDate.getMinutes()
//       : `0${newDate.getMinutes()}`
//   } ${
//     newDate.getSeconds() >= 10
//       ? newDate.getSeconds()
//       : `0${newDate.getSeconds()}`
//   }`;
//   return dateFormat;
// };

// export const obtainFirstAndLastDayOfMonth = ({
//   month = "",
//   year = new Date().getFullYear(),
// }: {
//   month: string;
//   year: number;
// }) => {
//   switch (month.toLowerCase()) {
//     case "enero":
//       return {
//         firstDay: `${year}-01-01`,
//         endDay: `${year}-01-31`,
//       };
//     case "febrero":
//       return {
//         firstDay: `${year}-02-01`,
//         endDay: `${year}-02-${year % 4 === 0 ? "29" : "28"}`,
//       };
//     case "marzo":
//       return {
//         firstDay: `${year}-03-01`,
//         endDay: `${year}-03-31`,
//       };
//     case "abril":
//       return {
//         firstDay: `${year}-04-01`,
//         endDay: `${year}-04-30`,
//       };
//     case "mayo":
//       return {
//         firstDay: `${year}-05-01`,
//         endDay: `${year}-05-31`,
//       };
//     case "junio":
//       return {
//         firstDay: `${year}-06-01`,
//         endDay: `${year}-06-30`,
//       };
//     case "julio":
//       return {
//         firstDay: `${year}-07-01`,
//         endDay: `${year}-07-31`,
//       };
//     case "agosto":
//       return {
//         firstDay: `${year}-08-01`,
//         endDay: `${year}-08-31`,
//       };
//     case "agosto":
//       return {
//         firstDay: `${year}-08-01`,
//         endDay: `${year}-08-31`,
//       };
//     case "setiembre":
//       return {
//         firstDay: `${year}-09-01`,
//         endDay: `${year}-09-30`,
//       };
//     case "octubre":
//       return {
//         firstDay: `${year}-10-01`,
//         endDay: `${year}-10-31`,
//       };
//     case "noviembre":
//       return {
//         firstDay: `${year}-11-01`,
//         endDay: `${year}-11-30`,
//       };
//     case "diciembre":
//       return {
//         firstDay: `${year}-12-01`,
//         endDay: `${year}-12-31`,
//       };
//     default:
//       return null;
//   }
// };

// export const generateArrayDates = (quantity: number) => {
//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
//   let auxIndex = 1;
//   const array: DateBody[] = [];
//   for (let i = 0; i < quantity; i++) {
//     const objectMonth = {
//       year: !months[currentMonth - i] ? currentYear - 1 : currentYear,
//       month: !months[currentMonth - i]
//         ? months[months.length - auxIndex]
//         : months[currentMonth - i],
//     };
//     let monthParams = obtainFirstAndLastDayOfMonth(objectMonth);
//     if (!months[currentMonth - i]) {
//       auxIndex++;
//     }
//     array.unshift({
//       startDate: `${monthParams?.firstDay}T00:00:00.0+00:00`,
//       endDate: `${monthParams?.endDay}T23:59:59.999+00:00`,
//     });
//   }
//   return array;
// };

// export const checkMaskDocument = (
//   doctype: string,
//   document: string
// ): boolean => {
//   if (doctype) {
//     if (docPatterns[doctype]) {
//       const result = docPatterns[doctype].test(document);
//       return result;
//     } else {
//       const result = docPatterns.default.test(document);
//       return result;
//     }
//   } else {
//     return true;
//   }
// };

// export const calculateAge = (date: string | undefined): number => {
//   let currentDate = new Date();
//   if (!date) {
//     return 0;
//   }
//   let birthday = new Date(date);
//   let currentYear = currentDate.getFullYear();
//   let currentMonth = currentDate.getMonth() + 1;
//   let currentDay = currentDate.getDate();
//   let yearDate = birthday.getFullYear();
//   let monthDate = birthday.getMonth() + 1;
//   let dayDate = birthday.getDate() + 1;
//   let age = currentYear - yearDate;

//   if (currentMonth < monthDate) {
//     age = age - 1;
//   } else if (currentMonth === monthDate) {
//     if (currentDay < dayDate) {
//       age = age - 1;
//     }
//   }
//   return age;
// };

const formatDatetoYYYYMMDDHHmmSS = (date: Date, separator = "/") => {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let day = date.getUTCDate();

  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();

  month++;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${year}${separator}${monthString}${separator}${dayString} ${hoursString}:${minutesString}:${secondsString}`;
};

const formatDatetoYYYYMMDD = (date: Date, separator = "/") => {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let day = date.getUTCDate();

  month++;
  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${year}${separator}${monthString}${separator}${dayString}`;
};

const replaceAll = (date: string, of: string, to: string) => {
  const chars = date.split("");
  const newChar = chars.map((c) => (c === of ? to : c));
  return newChar.join("");
};

export { formatDatetoYYYYMMDDHHmmSS, formatDatetoYYYYMMDD, replaceAll };
