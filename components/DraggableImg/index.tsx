import cc from 'classcat';
import Draggable from 'react-draggable';
import * as React from 'react';
import styles from './index.module.css';
import { getComputedSize } from './utils';

type Props = {
  src: string;
  wrapperWidth: number;
  wrapperHeight: number;
};

const DraggableImg = (props: Props) => {
  const [{ naturalWidth, naturalHeight }, setSrcSize] = React.useState({
    naturalWidth: 0,
    naturalHeight: 0,
  });

  React.useEffect(() => {
    if (!!props.src) {
      const imageDom = document.createElement('img');
      imageDom.setAttribute('src', props.src);

      imageDom.onload = () => {
        const { naturalWidth, naturalHeight } = imageDom;

        setSrcSize({
          naturalWidth,
          naturalHeight,
        });
      };
    }
  }, [props.src]);

  if (!props.src || naturalWidth === 0 || naturalHeight === 0) return null;

  const { axis, width, height } = getComputedSize(
    props.wrapperWidth,
    props.wrapperHeight,
    naturalWidth,
    naturalHeight
  );

  return (
    <Draggable
      axis={axis}
      bounds={{
        left: props.wrapperWidth - width,
        top: props.wrapperHeight - height,
        right: 0,
        bottom: 0,
      }}
    >
      <span
        className={cc([
          styles['draggable-img'],
          styles[`draggable-img--${axis}`],
        ])}
        style={{
          width,
          height,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles['draggable-img__source']}
          src={props.src}
          alt="cover"
          width={width}
          height={height}
        />
      </span>
    </Draggable>
  );
};

export default DraggableImg;
