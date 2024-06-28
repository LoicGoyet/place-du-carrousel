import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';
import { coverShapes } from '@/data/cover';

type Props = {
  title: string;
  img: string;
  shape: keyof typeof coverShapes;
};

export default React.forwardRef<HTMLDivElement, Props>(function Cover(
  { title, img, shape },
  ref
) {
  const { width, height } = coverShapes[shape];

  return (
    <div className={styles['cover']} style={{ width, height }} ref={ref}>
      <h1 className={styles['cover__heading']}>{title}</h1>
      <DraggableImg src={img} wrapperWidth={width} wrapperHeight={height} />
    </div>
  );
});
