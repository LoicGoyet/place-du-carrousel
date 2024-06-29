import * as React from 'react';
import DraggableImg from '../DraggableImg';
import styles from './index.module.css';
import { coverShapes, isInShapeComposition } from '@/data/cover';
import Logo from '../Logo';
import cc from 'classcat';

type Props = {
  title: string;
  subtitle: string;
  img: string;
  shape: keyof typeof coverShapes;
  className?: string;
};

export default React.forwardRef<HTMLDivElement, Props>(function Cover(
  { title, subtitle, img, shape, className },
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
        <h1
          className={cc({
            [styles['cover__subtitle']]: true,
            [styles['cover__subtitle--hidden']]: !isInShapeComposition(
              shape,
              'subtitle'
            ),
          })}
        >
          {subtitle}
        </h1>
        {!!title ? <span className={styles['cover__separator']} /> : null}
      </div>

      {shape === 'story-instagram' ? (
        <p className={styles['cover__callout']}>
          Disponible sur :<br />
          Spotify, Apple et votre appli de podcast favorite
        </p>
      ) : null}

      <DraggableImg src={img} wrapperWidth={width} wrapperHeight={height} />
    </div>
  );
});
