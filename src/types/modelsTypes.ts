export interface AcademicProgram_I {
  id?: number;
  name: string;
  code: string;
  siuCode: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademicPrograms_I {
  academicPrograms: AcademicProgram_I[];
}

export interface Call_I {
  id?: number;
  name: string;
  slug: string;
  year: number;
  cycle: number;
  startDate: string;
  endDate: string;
  status: number;
  observations: string;
  modality: string;
  placeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Calls_I {
  calls: Call_I[];
}

export interface FileDocument_I {
  id?: number;
  name: string;
  type: string;
  fileId: string;
  documentTypeId: number;
  path: string;
  postulantId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FileDocuments_I {
  fileDocuments: FileDocument_I[];
}

export interface FileDocumentType_I {
  id?: number;
  name: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FileDocumentTypes_I {
  fileDocumentTypes: FileDocumentType_I[];
}

export interface File_I {
  id?: number;
  name: string;
  size: number;
  mimeType: string;
  extension: string;
  relativePath: string;
  path: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Files_I {
  files: File_I[];
}

export interface HigherEducationalInstitution_I {
  id?: number;
  code: string;
  name: string;
  ubigeo: string;
  country: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HigherEducationalInstitutions_I {
  higherEducationalInstitutions: HigherEducationalInstitution_I[];
}

export interface Interview_I {
  id?: number;
  callId: number;
  academicProgramId: number;
  postulantId: number;
  userId: number;
  status: number;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Interviews_I {
  interviews: Interview_I[];
}

export interface InterviewDetail_I {
  id?: number;
  score: number;
  observations: string;
  date: string;
  interviewId: number;
  postulantId: number;
  interviewIndicatorsId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InterviewDetails_I {
  interviewDetails: InterviewDetail_I[];
}

export interface InterviewIndicator_I {
  id?: number;
  description: string;
  maxScore: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InterviewIndicators_I {
  interviewIndicators: InterviewIndicator_I[];
}

export interface Place_I {
  id?: number;
  code: string;
  name: string;
  address: string;
  phone: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Places_I {
  places: Place_I[];
}

export interface PostulantAcademical_I {
  id?: number;
  institutionId: number;
  institutionName: string;
  type: string;
  postulantId: number;
  admissionYear: string;
  graduationYear: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostulantAcademicals_I {
  postulantAcademicals: PostulantAcademical_I[];
}

export interface PostulantMediaContact_I {
  id?: number;
  type: string;
  value: string;
  postulantId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostulantMediaContacts_I {
  postulantMediaContacts: PostulantMediaContact_I[];
}

export interface PostulantPlace_I {
  id?: number;
  country: string;
  ubigeo: string;
  address: string;
  type: string;
  postulantId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostulantPlaces_I {
  postulantPlaces: PostulantPlace_I[];
}

export interface Postulant_I {
  id?: number;
  name: string;
  fatherSurname: string;
  motherSurname: string;
  marriedSurname: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  observations: string;
  documentType: string;
  documentNumber: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Registration_I {
  id?: number;
  date: string;
  postulantId: number;
  callId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Registrations_I {
  registrations: Registration_I[];
}

export interface Vacancy_I {
  id?: number;
  academicProgramId: number;
  callId: number;
  quantity: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vacancies_I {
  vacancies: Vacancy_I[];
}

export interface Payment_I {
  id?: number;
  paymentId: string;
  amount: number;
  date: string;
  imageUrl: string;
  postulantId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Payments_I {
  payments: Payment_I[];
}
