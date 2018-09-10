export class PersonalInfoFields {
  name = '';
  avatar = '';
  // role = '';
  mobile = '';
  email = '';
  country = '';
  city = '';
  address = '';
  description = '';
  // rate = '';
  usertype = '';
  // otherroles: string[] = [];
}

export class LanguageFields {
  name = '';
  proficiency = '';
}

export class TeamFields {
  networkid = '';
}

export class ExperienceFields {
  companyname = '';
  country = '';
  city = '';
  companyurl = '';
  role = '';
  from = '';
  to = '';
  type = '';
}

export class AwardsFields {
  type = '';
  name = '';
  category = '';
  date: Date;
  client = '';
  url = '';
}


export class NetworkFields {
  id = '';
  name = '';
  mobile = '';
  email = '';
  role = '';
  description = '';
  url = '';
}

export class ReferenceFields {
  name = '';
  mobile = '';
  email = '';
  role: string;
}

export class IndustryFields {
  industries: string[] = [];
}

export class GenresField {
  genres: string[] = [];
}

export class ToolsField {
  tools: string[] = [];
}

export class CategoriesField {
  categories: string[] = [];
}

export class EducationField {
  education = '';
}
