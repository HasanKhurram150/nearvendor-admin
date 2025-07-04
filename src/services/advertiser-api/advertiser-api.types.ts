export interface Iadvertiser {
  createdAt: string;
  updatedAt: string;
  id: string;
  uniqueId: string;
  companyName: string;
  nickName: string;
  registrationNumber: string;
  representative: string;
  departmentName: string;
  departmentIncharge: string;
  contactPersonEmail: string;
  contactPersonNumber: string;
  businessRegistrationDocument: string;
  cooperateAccountDocument: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface IAddAdvertiser {
  id: string
  companyName: string;
  nickName: string;
  registrationNumber: string;
  representative: string;
  businessRegistrationDocument: string;
  departmentName: string;
  bankName: string;
}

export interface IUpdateAdvertiser {
  id: string
  companyName: string;
  nickName: string;
  registrationNumber: string;
  representative: string;
  businessRegistrationDocument: string;
  departmentName: string;
  bankName: string;
}
