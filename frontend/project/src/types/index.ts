export interface User {
  id: string;
  name: string;
  email: string;
  isArtist: boolean;
}

export interface Product {
  id: string;             // maps to MongoDB _id
  userId: string;         // maps to backend user_id
  name: string;           // maps to title
  description: string;
  price: number;
  image_url: string;       // maps from image_url
  audio?: string | null;
  category: string;
  tags: string[];
  createdAt: string;
}
