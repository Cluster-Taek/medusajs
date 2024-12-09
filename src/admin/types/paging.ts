export interface IPagingParams {
  limit?: number;
  page?: number;
}

export interface IPagingResponse {
  count: number;
  limit: number;
  page: number;
}
