
export interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName?: string;
  isAgency: boolean;
  profileImage?: string | null;
  summary?: string;
}
