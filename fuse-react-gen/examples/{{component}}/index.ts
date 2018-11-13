import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { {{ Component }}, {{ Component }}Actions, {{ Component }}Attributes } from './{{component}}';

function mapStateToAttributes(store: Store): {{ Component }}Attributes {
  return {
  };
}

function mapDispatchToActions(dispatch: Dispatch<Store>): {{ Component }}Actions {
  return {
  };
}

export default connect(mapStateToAttributes, mapDispatchToActions)({{ Component }});
