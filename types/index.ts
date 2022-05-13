export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  balance: number | null;
  isAdmin: boolean;
};
