export interface Patient {
  id: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  createdAt: string;
}

export interface PatientFormData {
  name: string;
  avatar: string;
  description: string;
  website: string;
}