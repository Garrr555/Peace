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
  file: string;
  fileId: string;
}

export interface BookingType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  bookingCode: string;
  phone: string;
  userId: number;
  user: UserType;
  eventId: number;
  event: EventType;
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
  file?: string;
}
