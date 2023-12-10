export enum Status {
  DISABLE = 0,
  ENABLE = 1,
}
export enum Verified {
  VERIFIED = 0,
  UNVERIFIED = 1,
}
export enum Available {
  AVAILABLE = 0,
  UNAVAILABLE = 1,
}

export type Category = {
  id?: string;
  name?: string;
  description?: string;
  status?: Status;
};

export enum OPERATION_TYPE {
  IDENTITY = "IDENTITY",
  TRANSACTION = "TRANSACTION",
}

export type DocumentTypeDB = {
  id?: string;
  name?: string;
  code?: string;
  sequential?: number;
  length?: number;
  operation?: OPERATION_TYPE;
  status?: Status;
  regex?: string;
  created_date?: Date | string;
  updated_date?: Date | string;
};

export type Gender = {
  id?: string;
  name?: string;
  status?: Status;
};

export type Product = {
  id?: string;
  name?: string;
  price?: number;
  available?: Available;
  description?: string;
  image?: string;
  status?: Status;
  category?: Category;
  created_date?: Date | string;
  updated_date?: Date | string;
};

export type Reception = {
  id?: string;
  number_table?: string;
  code?: string;
  available?: Available;
  status?: Status;
  created_date?: Date | string;
  updated_date?: Date | string;
};

export type Module = {
  id?: string;
  name?: string;
  status?: Status;
};

export type RoleAccess = {
  id?: string;
  role?: Role;
  module?: Module;
};

export type Role = {
  id?: string;
  name?: string;
  alias?: string;
  status?: number;
  created_date?: Date | string;
  updated_date?: Date | string;
  permissions?: Module[];
};

export type SystemUser = {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
  status?: Status;
  verified?: Verified;
  role?: Role;
  user_creator?: SystemUser | null;
  account_suspension_day?: Date | string;
  access_token?: string;
  last_login?: string;
  refresh_token?: string;
  validation_token?: string;
  created_date?: Date | string;
  updated_date?: Date | string;
};

export type User = {
  id?: string;
  first_name?: string;
  last_name?: string;
  second_last_name?: string;
  document_type?: DocumentTypeDB | null;
  document_number?: string;
  cellphone_number?: string;
  address?: string;
  gender?: Gender | null;
  email?: string;
  password?: string;
  verified?: Verified;
  photo?: string;
  token?: string;
  status?: Status;
  tokens?: UserToken[];
  last_login?: Date | string;
  created_date?: Date | string;
  updated_date?: Date | string;
};

export type UserToken = {
  access_token: string;
  refresh_token: string;
};

/*
 * 0: Anulado
 * 1: Pendiente
 * 2: En Proceso
 * 3: Entregado | Cancelado
 */
export enum OrderStatus {
  "ANULLED" = 0,
  "PENDING" = 1,
  "IN_PROCESS" = 2,
  "DEVOTED" = 3,
}
export enum OrderType {
  "IN_LOCAL" = "COMER EN LOCAL",
  "TAKEAWAY" = "PARA LLEVAR",
}
export enum PaymentMethod {
  "CASH" = "AL CONTADO",
  "VISA" = "VISA",
  "MASTERCARD" = "MASTERCARD",
}
export enum OrderChannel {
  "APP" = "APP",
  "PRESENCIAL" = "PRESENCIAL",
}

export type Order = {
  id: string;
  order_number: string;
  order_type: OrderType;
  status: OrderStatus;
  client: User;
  user_identity_type: string;
  user_document_number: string;
  reception: Reception;
  recepcionist: SystemUser;
  reception_date: Date | string;
  payment_method: PaymentMethod;
  estimated_time: number;
  tax: number;
  subtotal: number;
  total: number;
  order_channel: OrderChannel;
  end_date: Date | string;
  items: OrderDetail[];
};

export type OrderDetail = {
  id: string;
  order: Order;
  product: Product;
  quantity: number;
  price_of_sale: number;
};
