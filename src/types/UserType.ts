import { AddressType } from "./AddressType.ts";
import { BankType } from "./BankType.ts";
import { CompanyType } from "./CompanyType.ts";
import { CryptoType } from "./CryptoType.ts";

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
  address: AddressType;
  macAddress: string;
  university: string;
  bank: BankType;
  company: CompanyType;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoType;
};
