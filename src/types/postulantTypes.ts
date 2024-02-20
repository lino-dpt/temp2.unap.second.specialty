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
  birthPlace: string;
  residencePlace: string;
  graduationYear: string;
  phoneNumber: string;
  email: string;
  address: string;
  maritalStatus: string;

  specialty: string | number;
  fileDocument: File;
  photoAvatar: File;
}

export interface Postulant {
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
