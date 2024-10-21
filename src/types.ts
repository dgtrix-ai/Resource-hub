export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  notes?: string;
}

export interface Platform {
  id: string;
  name: string;
  apiUrl: string;
  searchParams: string;
  resultKey: string;
  itemTransform: (item: any) => Resource;
}