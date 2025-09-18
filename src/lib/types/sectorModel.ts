export interface SectorModelGet {
  id: string;
  name: string;
  education?: string;
  username?: string;
  description?: string;
  symbol?: string;
  create_on: string;
  updated_on?: string;
}

export interface SectorModelNew {
  name: string;
  education?: string;
  username?: string;
  description?: string;
  symbol?: string;
}

export interface SectorModelPut {
  name?: string;
  education?: string;
  username?: string;
  description?: string;
  symbol?: string;
}
