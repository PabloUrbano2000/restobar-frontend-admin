export type Status = 0 | 1;
export type Verified = 0 | 1;
export type Available = 0 | 1;

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
  // id?: string;
  // user?: User;
  access_token: string;
  refresh_token: string;
};

/*
 * 0: Anulado
 * 1: Pendiente
 * 2: En Proceso
 * 3: Entregado | Cancelado
 */
type OrderStatus = 0 | 1 | 2 | 3;
type OrderType = "COMER EN LOCAL" | "PARA LLEVAR";
type PaymentMethod = "AL CONTADO" | "VISA" | "MASTERCARD";
type OrderChannel = "APP" | "PRESENCIAL";

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
  tax: number;
  subtotal: number;
  total: number;
  order_channel: OrderChannel;
  end_date: Date | string;
  items: OrderDetail[];
};

type Delivered = 0 | 1;

export type OrderDetail = {
  id: string;
  order: Order;
  product: Product;
  quantity: number;
  price_of_sale: number;
  delivered: Delivered;
};
