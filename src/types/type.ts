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
  tagId: number | null;
  tag: TagType | null;
  type: string | null;
  count: number | null;
  price: number | null;
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
  platform: string;
  department: string;
  salary: number;

  divisiId: number | null;
  divisi: DivisiType | null;
}

export interface DivisiType {
  ID: number;
  id: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;

  divisi: string;
  users: UserType[];
}

export interface EventFormData {
  name?: string;
  description?: string;
  image?: string;
  location?: string;
  datetime?: string;
  private?: boolean;
  file?: string;
  tagId: number | null;
  divisiId: number | null;
  type: string | null;
  count: number | null;
  price: number | null;
  email?: string | null;
  platform?: string | null
  role?: string | null;
  department?: string | null;
  salary: number | null;
}

export interface TagType {
  ID: number;

  CreatedAt: string;

  UpdatedAt: string;

  DeletedAt: null | string;

  name: string;
}