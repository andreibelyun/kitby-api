export type MailMessage = {
  subject: string;
  text: string;
  html: string;
};

type CommonInfo = {
  type: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber: string;
};

export type SimpleRequestParams = {
  additionalInfo?: string;
} & CommonInfo;

export type EstimateRequestParams = {
  count: string;
  preferredPrice: string;
  productDescription?: string;
  files?: string[];
} & CommonInfo;

export type CallbackRequestParams = {
  phoneNumber: string;
};
