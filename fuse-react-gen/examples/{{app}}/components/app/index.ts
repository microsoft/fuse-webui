import { login } from '@fuselab/ui-fabric/lib/actions';
import { WithAuthActions } from '@fuselab/ui-fabric/lib/withAuth';
import { withRouter } from '@fuselab/ui-fabric/lib/withRouter';
import { connect, Dispatch } from 'react-redux';
import { Store } from '../../store';
import { App, AppAttributes } from './app';

function mapStoreToAttributes(store: Store): AppAttributes {
  return {
    user: store.user
  };
}

function mapDispatchToActions(dispatch: Dispatch<Store>): WithAuthActions {
  return {
    login: history => {
      dispatch(login(history));
    }
  };
}

export default withRouter(connect(mapStoreToAttributes, mapDispatchToActions)(App));
