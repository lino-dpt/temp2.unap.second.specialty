export interface PostulantInitPreInscription {
  documentType: string;
  documentNumber: string;
  paymentId: string;
  paymentDate: string;
  paymentAmount: string;
  paymentVoucher: File;
  postulantId?: string | null;
  fileId?: string | null;
  fileType?: string | null;
}

// name: "",
// motherSurname: "",
// fatherSurname: "",
// marriedSurname: "",
// gender: null,
// birthDate: "",
// birthPlace: "",
// residencePlace: null,
// graduationYear: null,
// phoneNumber: "",
// email: "",
// address: "",
// maritalStatus: "",

// specialty: null,
// fileDocument: null,
// photoAvatar: null,
export interface PostulantPreInscription {
  postulantId?: string | null;
  name: string;
  motherSurname: string;
  fatherSurname: string;
  marriedSurname: string;
  gender: string;
  birthDate: string;

  birthCountry?: string;
  birthPlace: string;

  residenceCountry?: string;
  residencePlace: string;

  graduationYear: string;
  phoneNumber: string;
  email: string;
  address: string;
  maritalStatus?: string;

  hasDisability: boolean;
  disabilityType?: string;

  specialty: string;
  fileDocument: File;
  photoAvatar: File;
}

export interface Postulant {
  Id?: string | null;
  HashId?: string | null;
  Name: string;
  FatherSurname: string;
  MotherSurname?: string;
  MarriedSurname?: string;
  Gender: string;
  BirthDate: string;
  MaritalStatus: string;
  Observations?: string;
  DocumentType: string;
  DocumentNumber: string;
  Status?: boolean | number;
}
