import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';

type Props = {
  title: string;
  img: string;
};

export default React.forwardRef<HTMLDivElement, Props>(function Cover(
  { title, img },
  ref
) {
  return (
    <div className={styles['cover']} ref={ref}>
      <h1 className={styles['cover__heading']}>{title}</h1>
      <DraggableImg src={img} wrapperSize={1000} />
    </div>
  );
});
