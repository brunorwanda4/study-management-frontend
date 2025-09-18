export interface EducationModelGet {
  id: string;
  name: string;
  username?: string;
  description?: string;
  symbol ?: string;
  roles?: string[];
  created_on: string;
  updated_on?: string;
}

export interface EducationModelNew {
  name: string;
  username?: string;
  description?: string;
  symbol ?: string;
  roles?: string[];
}

export interface EducationModelPut {
  name?: string;
  username?: string;
  description?: string;
  symbol ?: string;
  roles?: string[];
}
