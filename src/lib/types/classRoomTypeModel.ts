export interface ClassRoomTypeModelGet {
  id: string;
  name: string;
  username?: string;
  description?: string;
  roles?: string[];
  created_on: string;
  updated_on?: string;
}

export interface ClassRoomTypeModelNew {
  name: string;
  username?: string;
  description?: string;
  roles?: string[];
}

export interface ClassRoomTypeModelPut {
  name?: string;
  username?: string;
  description?: string;
  roles?: string[];
}
