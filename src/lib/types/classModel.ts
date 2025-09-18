export interface ClassModelNew {
    name: string;
    username?: string;
    class_teacher?: string;
    trade?: string;
    sector?: string;
    code?: string;
    class_type?: string;
    class_room?: string;
    is_public?: boolean;
    image?: string;
    description?: string;
  }
  
  export interface ClassModelGet {
    id: string;
    name: string;
    username?: string;
    class_teacher?: string;
    trade?: string;
    sector?: string;
    code?: string;
    class_type?: string;
    class_room?: string;
    is_public?: boolean;
    image?: string;
    description?: string;
    created_on: string;
    updated_on?: string;
  }
  
  export interface ClassModelPut {
    name?: string;
    username?: string;
    class_teacher?: string;
    trade?: string;
    sector?: string;
    code?: string;
    class_type?: string;
    class_room?: string;
    is_public?: boolean;
    image?: string;
    description?: string;
  }
  