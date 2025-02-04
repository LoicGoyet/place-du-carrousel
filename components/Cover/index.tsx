import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';
import { coverShapes, isInShapeComposition } from '@/data/cover';
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
  const { width, height, imgWidth, imgHeight } = coverShapes[shape];

  return (
    <div
      className={cc([styles['cover'], styles[`cover--${shape}`], className])}
      style={{ width, height }}
      ref={ref}
    >
      <span className={styles['cover__gradient']} />
      <Logo className={styles['cover__logo']} />

      <div className={styles['cover__content']}>
        <h1
          className={cc({
            [styles['cover__title']]: true,
            [styles['cover__title--hidden']]: !isInShapeComposition(
              shape,
              'title'
            ),
          })}
        >
          {title}
        </h1>
        {!!title ? <span className={styles['cover__separator']} /> : null}
      </div>

      <DraggableImg
        src={img}
        wrapperWidth={imgWidth}
        wrapperHeight={imgHeight}
      />
    </div>
  );
});
