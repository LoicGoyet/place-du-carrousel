import cc from 'classcat';
import Draggable from 'react-draggable';
import * as React from 'react';
import styles from './index.module.css';

type Props = {
  src: string;
  wrapperSize: number;
};

const DraggableImg = (props: Props) => {
  const [{ originWidth, originHeight }, setSrcSize] = React.useState({
    originWidth: 0,
    originHeight: 0,
  });

  React.useEffect(() => {
    if (!!props.src) {
      const imageDom = document.createElement('img');
      imageDom.setAttribute('src', props.src);

      imageDom.onload = () => {
        const { naturalWidth, naturalHeight } = imageDom;

        setSrcSize({
          originWidth: naturalWidth,
          originHeight: naturalHeight,
        });
      };
    }
  }, [props.src]);

  if (!props.src || originWidth === 0 || originHeight === 0) return null;

  const orientation = originHeight / originWidth > 1 ? 'portrait' : 'landscape';
  const computedWidth =
    orientation === 'landscape'
      ? (originWidth * props.wrapperSize) / originHeight
      : props.wrapperSize;
  const computedHeight =
    orientation === 'portrait'
      ? (originHeight * props.wrapperSize) / originWidth
      : props.wrapperSize;

  return (
    <Draggable
      axis={orientation === 'landscape' ? 'x' : 'y'}
      bounds={{
        left: props.wrapperSize - computedWidth,
        top: props.wrapperSize - computedHeight,
        right: 0,
        bottom: 0,
      }}
    >
      <span
        className={cc([
          styles['draggable-img'],
          styles[`draggable-img--${orientation}`],
        ])}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles['draggable-img__source']}
          src={props.src}
          alt="cover"
          width={computedWidth}
          height={computedHeight}
        />
      </span>
    </Draggable>
  );
};

export default DraggableImg;
