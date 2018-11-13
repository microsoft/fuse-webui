import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tree, TreeActions, TreeAttributes } from './tree';

function mapStateToAttributes(store: Store): TreeAttributes {
  return {
  };
}

function mapDispatchToActions(dispatch: Dispatch<Store>): TreeActions {
  return {
  };
}

export default connect(mapStateToAttributes, mapDispatchToActions)(Tree);
