// Server-side ORM types

export type User = {
  id: number;
  did: string;
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