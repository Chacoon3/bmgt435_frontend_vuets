// Server-side ORM types

import type { AxiosResponse } from "axios";

export type User = {
  id: number;
  did: string;
  activated: boolean;
  first_name: string;
  last_name: string;
  group_id: number | null;
  group_name: string | null;
  role: string;
  tag_id: number | null;
  semester_id: number | null;
  semester_name: string | null;
};

export type Case = {
  id: number;
  create_time: string;
  name: string;
};

export type FoodcenterParams = {
  centers: string[];
  policies: number[][];
};

export type FoodcenterCenterState = {
  isOn: boolean;
  name: string;
  smallS: number;
  bigS: number;
};

export type CaseSubmissionParams<CaseParams> = {
  case_id: number;
  case_params: CaseParams;
};

export type FoodCenterSummary = {
  perf_metric: number;
  total_revenue: number;
  total_shortage_count: number;
  total_shortage_amount: number;
  total_holding_cost: number;
  total_fixed_cost: number;
}

export type CaseSubmissionResult<TSummary =any> = {
  case_record_id: number;
  summary:TSummary;
  file_url: string;
};

export type CaseRecord = {
  id: number;
  create_time: string;
  user_id: number;
  user_name: string;
  case_id: number;
  case_name: string;
  group_id: number;
  group_name: string;
  state: string;
  score: number;
  detail_json: object;
  file_name: string;
};

export type CaseConfig<T=any> = {
  id: number;
  create_time: string;
  edited_time: string;
  case_id: number;
  case_name: string;
  config_json: T;
}

export type Group = {
  id: number;
  name: string;
  users: User[];
  semester_id: number | null;
  semester_name: string | null;
};

export type Role = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type SystemStatus = {
  state: 'open' | 'close' | 'admin_only';
  user_count: number;
  activated_user_count: number;
  case_record_count: number;
}

export type FileUploadData<TMeta> = {
  file_stream?: Uint8Array;
  meta?: TMeta;
}

export type ImportUserData = FileUploadData<{
  semester_id: string;
}>

export type Semester = {
  id: number;
  name: string;
}

export type ValidatedBody<TData> = {
  data?: TData;
  errorMsg?: string;
}

export type ValidatedResponse<TData = any> = AxiosResponse<ValidatedBody<TData>>;