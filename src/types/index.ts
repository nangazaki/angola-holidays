export type Language = "pt" | "en";

export interface Holiday {
  date: string;
  name: {
    pt: string;
    en: string;
  };
  type: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  isMovable?: boolean;
}

export interface HolidayType {
  code: string;
  name: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}
