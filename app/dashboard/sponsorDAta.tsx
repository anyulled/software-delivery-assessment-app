export interface Sponsor {
  id: string;
  name: string;
  contact: ContactPerson[];
  status: SponsorStatus;
  level: SponsorLevel;
  extras?: SponsorExtras[];
  lastUpdateDate: Date;
  type: SponsorType;
  documents?: string[];
}

export enum SponsorType {
  IT_Company, Business, Consultancy, Fintech, Recruitment, Government, Gaming, Non_Profit
}

interface ContactPerson {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export enum SponsorStatus {
  confirmed,
  pending,
  rejected,
  signing,
  preparing_contract,
  not_contacted,
  requested_info,
  contacted,
  awaiting_response,
  not_interested,
  no_reply
}

export enum SponsorLevel {
  Basic, Regular, Premium, Top
}

export enum SponsorExtras {
  Diversity, SpeakersDinner, SponsorsDinner, preParty, netWorkingParty, logoTShirt, customizedRoom
}

export const data: Sponsor[] = [
  {
    id: '3b5a4c21-2255-4e1d-b05c-b40b442db809',
    name: 'Barcelona JUG',
    contact: [{
      id: 'e2cda4db-f428-4753-a5e9-a2b0d0be15c1',
      name: 'Anyul Rivas',
      email: 'info@barcelonajug.org',
      phone: '+34 638802609'
    }],
    status: SponsorStatus.confirmed,
    level: SponsorLevel.Premium,
    lastUpdateDate: new Date('01/03/2023'),
    type: SponsorType.Non_Profit
  },
  {
    id: '77887051-c93f-454c-bb40-bea17b17f2df',
    name: 'GFT',
    contact: [{
      id: '95ac523c-76b4-4749-908e-7d2df9626377',
      name: 'Marta Piñango',
      email: 'mrls@gft.com',
      phone: '+34 932965304'
    }],
    status: SponsorStatus.signing,
    level: SponsorLevel.Top,
    lastUpdateDate: new Date('12/12/2022'),
    type: SponsorType.Consultancy,
    documents: ['https://www.google.com', 'https://linkedin.com']
  },
  {
    id: 'aac711b8-46c3-4a52-9e6e-733d8da7581d',
    name: 'Confluent',
    contact: [{
      id: 'b098ea0c-14dc-4cd3-beb4-0348b365f586',
      name: 'Soyla Comadreja',
      email: 'soyla@confluent.com',
      phone: '+36 5693023986'
    }], status: SponsorStatus.pending,
    level: SponsorLevel.Regular,
    extras: [
      SponsorExtras.SpeakersDinner, SponsorExtras.logoTShirt
    ],
    lastUpdateDate: new Date('06/06/2023'),
    type: SponsorType.IT_Company
  }
];