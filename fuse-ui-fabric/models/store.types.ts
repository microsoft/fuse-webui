import { Preference } from '../themes';
import { UserInfo } from '../userProfile';

export interface BaseStore {
  user: UserInfo;
  preference: Preference;
  loginHostName: string;
}
