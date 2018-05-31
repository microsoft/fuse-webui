/* tslint:disable:no-use-before-declare */
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { BaseComponent, IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import * as _ from 'underscore';
import classNames from './form.classNames';
/* tslint:enable:no-use-before-declare */

export interface FormFieldAttributes {
  title: string;
  required?: boolean;
  placeholder?: string;
  tooltip?: string | (() => JSX.Element);
  error?: string | (() => JSX.Element);
}

export type FormFieldProps = FormFieldAttributes & IBaseProps;

/**
 * Generic form field component
 */
export class FormField extends BaseComponent<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={classNames().formField}>
        <div>
          {this.renderFieldInfo()}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

  private renderFieldInfo(): JSX.Element {
    const content = _.isString(this.props.tooltip) ? this.props.tooltip : null;
    const renderContent = (this.props.tooltip && !_.isString(this.props.tooltip)) ? this.props.tooltip : null;

    if (!renderContent) {
      return (
        <TooltipHost content={content}>
          <label>{this.props.required ? `* ${this.props.title}` : this.props.title}</label>
        </TooltipHost>
      );
    }

    return (
      <TooltipHost tooltipProps={{ onRenderContent: renderContent }}>
        <label>{this.props.required ? `* ${this.props.title}` : this.props.title}</label>
      </TooltipHost>
    );
  }
}
