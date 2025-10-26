export interface ClassTypeModelGet {
  id: string;
  name: string;
  username?: string;
  description?: string;
  roles?: string[];
  created_on: string;
  updated_on?: string;
}

export interface ClassTypeModelNew {
  name: string;
  username?: string;
  description?: string;
  roles?: string[];
}

export interface ClassTypeModelPut {
  name?: string;
  username?: string;
  description?: string;
  roles?: string[];
}
