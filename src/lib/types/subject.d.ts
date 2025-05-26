export interface Subject extends DatabaseProperties {
  name: string;
  icon: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface SubjectsResponse {
  message: string;
  metadata: Metadata;
  subjects: Subject[];
}
