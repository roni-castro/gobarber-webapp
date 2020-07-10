import UserData from './UserData';
export default interface AuthDTO {
  user: UserData;
  token: string;
}
