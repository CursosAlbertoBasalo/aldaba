export interface Resource {
  id: string;
  name: string;
  description?: string;
  url?: string;
  categoryId: string;
  price?: number;
  course?: {
    date?: Date;
    teacher?: string;
    academy?: string;
  };
}
