export class Profile {
  identityid: string;
  name: string;
  avatar: string;
  avatarFull: string;
  role: string;
  mobile: string;
  email: string;
  country: string;
  city: string;
  address: string;
  description: string;
  profilestatus: string;
  rate: Rate[];
  completepercentage: string;
  usertype: string;
  brandname: string;
  brandurl: string;
  education: string;
  otherroles: string[];
  secroles: OtherRoles[];
  industries: string[];
  genres: string[];
  tools: string[];
  categories: string;
  languages: Language[];
  otherLocations: Location[];
  portfolio: Portfolio[];
  experience: Experience[];
  awards: Awards[];
  network: Network[];
  reference: Reference[];
  payment: any;
  links: Links;
}

export class OtherRoles {
  role: string;
  currency: string;
  budget: string;
  timerange: string;
}

export class Links {
  website: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  vimeo: string;
  behance: string;
  others: string[];
}

export class Payment {
  bankname = '';
  branch = '';
  accountnumber = '';
  ifsccode = '';
  pannumber = '';
}

export class Rate {
  min: number;
  max: number;
}

export class Language {
  name: string;
  proficiency: string;
}

export class Location {
  city: string;
  country: string;
}

export class Portfolio {
  id: string;
  title: string;
  urltype: string;
  url: string;
  description: string;
  thumbnailurl: string;
  role: string;
  client: string;
  genre: string;
  category: string;
  duration: string;
  date: Date;
  team: Team[];
  country: string;
  city: string;
  language: string;
  company: string;
}

export class Team {
  networkid: string;
}

export class Experience {
  id = '';
  companyname = '';
  country = '';
  city = '';
  companyurl = '';
  role = '';
  from = '';
  to = '';
  type = '';
}

export class Awards {
  type: string;
  name: string;
  category: string;
  date: Date;
  client: string;
  url: string;
}


export class Network {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  // description: string;
  // url: string;
}

export class Reference {
  name: string;
  mobile: string;
  email: string;
  role: string;
}
