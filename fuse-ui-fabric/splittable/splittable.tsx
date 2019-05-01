import { Func } from '@fuselab/ui-shared/lib/typeHelpers';
import * as React from 'react';
import * as _ from 'underscore';
/* tslint:enable:no-use-before-declare */
import classNames from './splittable.classNames';

export interface SplittableAttributes {
  orientation: 'horizontal' | 'vertical';
  parts: Func<JSX.Element>[];
}

export interface SplittableActions {
  onLayout(partitions: number[]);
}

export type SplittableProps = SplittableAttributes & SplittableActions;

export function layoutStack(max: number, parts: number[], index: number, delta: number): number[] {
  const total = parts.reduce((s, c) => s + c, 0);
  const unassignedCount = parts.reduce((s, c) => c ? s : s + 1, 0);
  const unassignedAmount = Math.round(max - total) / unassignedCount;
  const cur = parts.map(x => x || unassignedAmount);

  if (delta) {
    const prev = cur[index];
    const next = cur[index + 1];
    const effectiveDelta = delta > 0 ? Math.min(next, delta) : Math.max(-prev, delta);
    cur.splice(index, 2, prev + effectiveDelta, next - effectiveDelta);
  }

  return cur;
}

function handleResize(props: SplittableProps, resize: (delta: number) => void, e: React.KeyboardEvent) {
  const key = e.key;
  let delta = 0;
  if (props.orientation === 'vertical') {
    if (key === 'ArrowLeft') {
      delta = -12;
    } else if (key === 'ArrowRight') {
      delta = 12;
    }
  } else if (props.orientation === 'horizontal') {
    if (key === 'ArrowUp') {
      delta = -12;
    } else if (key === 'ArrowDown') {
      delta = 12;
    }
  }
  resize(delta);
}

export const Splittable = (props: SplittableProps) => {
  const [partitions, setState] = React.useState<number[]>([]);
  const classes = classNames(props.orientation);
  const getSize = (index: number) => partitions[index] ? `${partitions[index]}px` : 'auto';
  const getStyle = (index: number) => ({ [props.orientation === 'vertical' ? 'width' : 'height']: getSize(index) });
  const rootRef = React.createRef<HTMLDivElement>();
  const dividerRefs = _.range(0, props.parts.length).map(x => React.createRef<HTMLDivElement>());
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  // render a part with part container
  const renderPartOnly = (part: Func<JSX.Element>, index: number) => ([(
    <div
      className={classes.part}
      key={`split_part_${index}`}
      style={getStyle(index)}
      onDragOver={onDragOver}
    >
      {part()}
    </div>)]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!partitions.length) {
      const parts = _.range(0, props.parts.length).map(x => 0);
      setState(layoutStack(root.clientWidth, parts, 0, 0));
    }
  });

  // render a part with optional  splitter
  const renderPart = (part: Func<JSX.Element>, index: number) => {
    let prevPosition = 0;
    if (index === 0) {
      return renderPartOnly(part, index);
    }

    const onStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('text/plain', `${partitions[index - 1]}`);
      prevPosition = props.orientation === 'vertical' ? e.screenX : e.screenY;
    };

    const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
      const cur = props.orientation === 'vertical' ? e.screenX : e.screenY;
      const delta = cur - prevPosition;
      const root = rootRef.current;
      if (delta !== 0) {
        prevPosition = cur;
        const next = layoutStack(root.clientWidth, partitions, index - 1, delta);
        setState(next);
      }
    };
    const resize = (delta: number) => {
      const root = rootRef.current;
      const next = layoutStack(root.clientWidth, partitions, index - 1, delta);
      setState(next);
    };

    const handleKeyboard = handleResize.bind(null, props, resize);

    return [(
      <div
        ref={dividerRefs[index]}
        className={classes.divider}
        key={`split_divider_${index}`}
        draggable={true}
        onKeyDown={handleKeyboard}
        onDragStart={onStart}
        onDrag={null}
        onDragEnd={onDrag}
        tabIndex={0}
        role='separator'
      />),
    ...renderPartOnly(part, index)
    ];
  };

  return (
    <div className={classes.root} ref={rootRef}>
      {props.parts.map(renderPart)}
    </div>
  );
};
