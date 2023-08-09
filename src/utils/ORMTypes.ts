// Server-side ORM types

export type User = {
    id: number;
    user_did: string;
    first_name: string;
    last_name: string;
    group_id: number | null;
    role: number | null;
    tag_id: number | null;
  };
  
  export type Case = {
    id: number;
    name: string;
    description: string;
  };

  export type CaseRecord = {
    id: number;
    create_time: string;
    case_id: number;
    case_name: string;
    group_id: number;
    group_name: string;
    score: number;
    detail_json: object;
  };
  
  export type Group = {
    id: number;
    name: string;
    users: User[];
  };
  
  export type Role = {
    id: number;
    name: string;
  };
  
  export type Tag = {
    id: number;
    name: string;
  };