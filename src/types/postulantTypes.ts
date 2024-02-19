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
