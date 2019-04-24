import { PrimaryButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import * as React from 'react';
import { UserInfo } from '../userProfile';
import { History, WithRouter } from '../withRouter';
import classNames from './withAuth.classNames';

export interface WithAuthActions {
  login(history: History): void;
}

export interface WithAuthAttributes {
  user: UserInfo;
  isLogin?(history: History): boolean;
}

export type WithAuthProps = WithAuthAttributes & WithAuthActions;

export const withAuth = <P extends WithRouter<Object>>(Inner: React.ComponentClass<P & WithAuthProps & React.RefAttributes<any>>, ...roles: string[]) =>
  class WithAuth extends React.Component<P & WithAuthProps> {
    public render(): JSX.Element {
      if (this.props.user || (this.props.isLogin && this.props.isLogin(this.props.history))) {
        return <Inner {...this.props} />;
      } else {
        return (
          <div className={classNames().root}>
            <section>
              <h2>Please sign in</h2>
              <PrimaryButton text='Sign in' onClick={this.login} />
            </section>
          </div>
        );
      }
    }

    public get login(): () => void {
      return () => {
        this.props.login(this.props.history);
      };
    }
  };
