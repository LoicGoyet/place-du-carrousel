import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';

type Props = {
  title: string;
  src: string;
};

export default React.forwardRef<HTMLDivElement, Props>(function Cover(
  { title, src },
  ref
) {
  return (
    <div className={styles['cover']} ref={ref}>
      <h1 className={styles['cover__heading']}>{title}</h1>
      <DraggableImg src={src} wrapperSize={1000} />
    </div>
  );
});
