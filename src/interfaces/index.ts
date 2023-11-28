export interface PaginateResponse<T> {
  status_code: number;
  total_docs: number;
  has_prev_page: boolean;
  has_next_page: boolean;
  limit: number;
  count: number;
  prev_page: number | null;
  next_page: number | null;
  current_page: number;
  total_pages: number;
  docs: T[];
}

export interface DocumentResponse<T> {
  status_code: number;
  message?: string;
  data?: {
    user?: T;
    access_token?: string;
    refresh_token?: string;
  };
}

export interface ErrorResponse {
  status_code: number;
  error_code?: string;
  errors: string[];
}
