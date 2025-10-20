export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  companyName: string;
}