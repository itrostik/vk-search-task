import { UserType } from './UserType.ts';

export type SearchType = {
  users: UserType[];
  currentFormValue: string;
  errorMessage: string;
};
