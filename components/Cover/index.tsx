import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';
import { coverShapes } from '@/data/cover';
import Logo from '../Logo';
import cc from 'classcat';

type Props = {
  title: string;
  img: string;
  shape: keyof typeof coverShapes;
  className?: string;
};

export default React.forwardRef<HTMLDivElement, Props>(function Cover(
  { title, img, shape, className },
  ref
) {
  const { width, height } = coverShapes[shape];

  return (
    <div
      className={cc([styles['cover'], styles[`cover--${shape}`], className])}
      style={{ width, height }}
      ref={ref}
    >
      <span className={styles['cover__gradient']} />
      <Logo className={styles['cover__logo']} />
      <h1 className={styles['cover__heading']}>{title}</h1>
      <DraggableImg src={img} wrapperWidth={width} wrapperHeight={height} />
    </div>
  );
});
