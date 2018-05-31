import { History } from 'history';
import { match } from 'react-router-dom';
export { withRouter, match, RouteComponentProps } from 'react-router-dom';
export { History, Location } from 'history';

export interface WithRouter<P> {
  history: History;
  location?: Location;
  match?: match<P>;
}
