/* tslint:disable:no-use-before-declare */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setAccessToken } from '../actions';
import { BaseStore } from '../models';
import { LoginForm, LoginFormAction, LoginFormAttributes } from './login';
/* tslint:enable:no-use-before-declare */

function mapStateToProps<Store extends BaseStore>(state: Store): LoginFormAttributes {
  return { loginHostName: state.loginHostName };
}

function mapDispatchToActions<Store>(dispatch: Dispatch<Store>): LoginFormAction {
  return {
    setAccessToken: token => {
      dispatch(setAccessToken(token));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(LoginForm);
