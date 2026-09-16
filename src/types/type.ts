export interface EventType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  description: string;
  location: string;
  image: string;
  imageId: string;
  userid: number;
  user: UserType;
  datetime: string;
  listBooking: null;
  private: boolean;
}

export interface UserType {
  ID: number;
  id: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  email: string;
  password: string;
  role: string;
  Events: null;
  image: string;
}

export interface EventFormData {
  name?: string;
  description?: string;
  image?: string;
  location?: string;
  datetime?: string;
  private?: boolean;
}
