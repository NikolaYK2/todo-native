import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  headers: {
    "API-KEY": 'f6bda301-132d-49df-8c79-f6fa4c3fd15d',
    "cookie": 'ASP.NET_SessionId=1pbpxkfmyjbd5q2puknw0lsy; .ASPXAUTH=4CE83C3A3000E0F761071054847544A10C8B12511BB488B0920D2117DBC850C39E3795BC32CDFC0E1170EDFB6E54BC2C50560531E6804A81FE42C9CA44342AAA36B793FF9F49B1B66BD840A93580086DDC17A745'
  },
});

type FieldsErrorsType = {
  error: string;
  field: string;
};
export type BaseResponsTodolistsType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldsErrorsType[];
};


export const ResultCode = {
  Ok: 0,
  Error: 1,
  Captcha: 10,
} as const;

type ResCodeType = keyof typeof ResultCode;

//TASK status type==============================================
export enum TaskStatuses { //Тип данных. Перечисление всех возможных вариантов
  New = 0, //Где isDOne false = New
  InProgress = 1,
  Completed = 2, //выполнено,типо isDone ture
  Draft = 3,
}

export enum TodoTaskPriorities { //Тип данных. Перечисление всех возможных вариантов
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
