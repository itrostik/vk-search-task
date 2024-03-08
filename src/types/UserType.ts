import { AddressType } from './AddressType.ts';
import { BankType } from './BankType.ts';
import { CompanyType } from './CompanyType.ts';
import { CryptoType } from './CryptoType.ts';

//типизация user, получаемых с JSON

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: AddressType; //вынес в отдельный тип, потому что слишком большая вложенность получается
  macAddress: string;
  university: string;
  bank: BankType; //вынес в отдельный тип, потому что слишком большая вложенность получается
  company: CompanyType; //вынес в отдельный тип, потому что слишком большая вложенность получается
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoType; //вынес в отдельный тип, потому что слишком большая вложенность получается
};
