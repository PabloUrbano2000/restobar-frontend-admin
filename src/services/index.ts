/* Servicios para roles */

import { enviroments } from "../env";
import { DocumentResponse, PaginateResponse } from "../interfaces";
import { Role, SystemUser } from "../types";
import { COOKIE_TOKEN } from "../utils/constants";
import { getCookie } from "../utils/cookies";

export const loginSystemUser = async ({
  email,
  password,
}: SystemUser): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await result.json();
};

export const recoveryAccount = async ({
  email,
}: SystemUser): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/auth/account/recovery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  return await result.json();
};

export const verifyAccountToken = async (
  token: string
): Promise<DocumentResponse<null>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/auth/account/verify`,
    {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    }
  );
  return await result.json();
};

export const recoveryPassword = async ({
  email,
}: SystemUser): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/auth/password/recovery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  return await result.json();
};

export const verifyPasswordToken = async (
  token: string
): Promise<DocumentResponse<null>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/auth/password/verify`,
    {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    }
  );

  return await result.json();
};

export const changePassword = async ({
  new_password,
  confirm_password,
  token,
}: {
  new_password: string;
  confirm_password: string;
  token: string;
}): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/auth/password/change`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        new_password,
        confirm_password,
      }),
    }
  );
  return await result.json();
};

export const getRoles = async (): Promise<PaginateResponse<Role>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/role/list`, {
    method: "POST",
    headers: { "x-access-token": getCookie(COOKIE_TOKEN) || "" },
  });

  return await result.json();
};

export const getSystemUsers = async (): Promise<
  PaginateResponse<SystemUser>
> => {
  const result = await fetch(`${enviroments.API_URL}/admin/system-user/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
  });
  return await result.json();
};

export const createUser = async (
  data: SystemUser & {
    role: string;
  }
): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/system-user/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
      body: JSON.stringify({
        email: data?.email?.toLowerCase(),
        first_name: data?.first_name,
        last_name: data?.last_name,
        role: data.role,
      }),
    }
  );
  return await result.json();
};

export const enableSystemUser = async (
  id: string
): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/system-user/enable`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );
  return await result.json();
};

export const disableSystemUser = async (
  id: string
): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/system-user/disable`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );
  return await result.json();
};
