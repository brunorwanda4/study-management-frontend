export interface ClassRoomModelNew {
  name: string;
  username?: string;
  sector?: string;
  trade?: string;
  class_room_type?: string;
  image?: string;
  description?: string;
  symbol?: string;
}

export interface ClassRoomModelGet {
  id: string;
  name: string;
  username?: string;
  sector?: string;
  trade?: string;
  class_room_type?: string;
  image?: string;
  description?: string;
  symbol?: string;
  created_on: string;
  updated_on?: string;
}

export interface ClassRoomModelPut {
  name?: string;
  username?: string;
  sector?: string;
  trade?: string;
  class_room_type?: string;
  image?: string;
  description?: string;
  symbol?: string;
}
