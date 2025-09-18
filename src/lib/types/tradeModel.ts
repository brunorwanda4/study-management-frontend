export interface TradeModelGet {
  id: string;
  name: string;
  username?: string;
  description?: string;
  sector?: string;
  class_rooms ?: number,
  create_on: string;
  updated_on?: string;
}

export interface TradeModelNew {
  name: string;
  username?: string;
  sector?: string;
  description?: string;
  class_rooms ?: number,
}

export interface TradeModelPut {
  name?: string;
  username?: string;
  description?: string;
  sector?: string;
  class_rooms ?: number,
}
