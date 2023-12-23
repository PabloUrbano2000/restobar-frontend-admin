/* Servicios para roles */

import { enviroments } from "../env";
import { DocumentResponse, PaginateResponse } from "../interfaces";
import {
  Category,
  Order,
  Product,
  Reception,
  Role,
  SystemUser,
  User,
} from "../types";
import { COOKIE_TOKEN } from "../utils/constants";
import { getCookie } from "../utils/cookies";

export const logout = async (): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/auth/logout`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
  });
  return await result.json();
};

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

export const getSystemUserById = async (
  id: string
): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/system-user/get`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const createSystemUser = async (
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

export const updateSystemUserById = async (
  data: SystemUser & {
    role: string;
  }
): Promise<DocumentResponse<SystemUser>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/system-user/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
      body: JSON.stringify({
        id: data.id,
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

export const getCategories = async (): Promise<PaginateResponse<Category>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/category/list`, {
    method: "POST",
    headers: { "x-access-token": getCookie(COOKIE_TOKEN) || "" },
  });
  return await result.json();
};

export const getProducts = async (): Promise<PaginateResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      limit: 250,
    }),
  });
  return await result.json();
};

export const getProductById = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/get`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const createProduct = async (
  data: Product & {
    category: string;
  }
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      name: data?.name?.toLowerCase().trim(),
      category: data?.category,
      description: data?.description,
      price: data.price,
    }),
  });
  return await result.json();
};

export const updateProductById = async (
  data: Product & {
    category: string;
  }
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id: data?.id,
      name: data?.name,
      category: data?.category,
      description: data?.description,
      price: data.price,
    }),
  });
  return await result.json();
};

export const uploadImageProductById = async (
  body: FormData
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/product/image/upload`,
    {
      method: "PUT",
      headers: {
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
      body,
    }
  );
  return await result.json();
};

export const deleteImageProductById = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/product/image/delete`,
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

export const enableProduct = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/enable`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const disableProduct = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/disable`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const availableProduct = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/product/available`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const unavailableProduct = async (
  id: string
): Promise<DocumentResponse<Product>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/product/unavailable`,
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

export const getOrders = async (): Promise<PaginateResponse<Order>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/order/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      limit: 100,
    }),
  });
  return await result.json();
};

export const getClients = async ({
  limit = 100,
  firstName,
  lastName,
  email,
}: {
  limit: number;
  firstName: string;
  lastName: string;
  email: string;
}): Promise<PaginateResponse<User>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/user/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      limit,
      first_name: firstName,
      last_name: lastName,
      email,
    }),
  });
  return await result.json();
};

export const getClientById = async (
  id: string
): Promise<DocumentResponse<User>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/user/get`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const getSales = async ({
  limit = 100,
  startDate,
  endDate,
}: {
  limit: number;
  startDate: string;
  endDate: string;
}): Promise<PaginateResponse<Order>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/order/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      limit,
      start_date: startDate,
      end_date: endDate,
      status: 3,
    }),
  });
  return await result.json();
};

export const getOrderById = async (
  id: string
): Promise<DocumentResponse<Order>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/order/get`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const inProcessOrder = async (
  id: string,
  estimated_time: number
): Promise<DocumentResponse<Order>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/order/in-process`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
      estimated_time,
    }),
  });
  return await result.json();
};

export const terminateOrder = async (
  id: string
): Promise<DocumentResponse<Order>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/order/terminate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const getReceptions = async (): Promise<PaginateResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/list`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
  });
  return await result.json();
};

export const getReceptionById = async (
  id: string
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/get`, {
    method: "POST",
    headers: {
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const createReception = async (
  data: Reception
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      code: data?.code?.trim(),
      number_table: data?.number_table?.trim(),
      status: data?.status,
      available: data?.available,
    }),
  });
  return await result.json();
};

export const updateReceptionById = async (
  data: Reception
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id: data?.id,
      code: data?.code?.trim(),
      number_table: data?.number_table?.trim(),
      status: data?.status,
      available: data?.available,
    }),
  });
  return await result.json();
};

export const enableReception = async (
  id: string
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/enable`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const disableReception = async (
  id: string
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(`${enviroments.API_URL}/admin/reception/disable`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getCookie(COOKIE_TOKEN) || "",
    },
    body: JSON.stringify({
      id,
    }),
  });
  return await result.json();
};

export const availableReception = async (
  id: string
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/reception/available`,
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

export const unavailableReception = async (
  id: string
): Promise<DocumentResponse<Reception>> => {
  const result = await fetch(
    `${enviroments.API_URL}/admin/reception/unavailable`,
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
