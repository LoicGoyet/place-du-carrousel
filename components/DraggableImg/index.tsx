import cc from 'classcat';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
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
  const [cursor, setCursor] = React.useState<
    's' | 'n' | 'ns' | 'e' | 'w' | 'ew' | 'null'
  >('null');
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

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

        setPosition({
          x: 0,
          y: 0,
        });
      };
    }
  }, [props.src]);

  React.useEffect(() => {
    const { axis } = getComputedSize(
      props.wrapperWidth,
      props.wrapperHeight,
      naturalWidth,
      naturalHeight
    );

    setPosition({
      x: 0,
      y: 0,
    });

    setCursor(() => {
      return axis === 'x' ? 'e' : 's';
    });
  }, [props.wrapperWidth, props.wrapperHeight, naturalWidth, naturalHeight]);

  const handleDrag = React.useCallback(
    (axis: 'x' | 'y', width: number, height: number) =>
      (e: DraggableEvent, data: DraggableData) => {
        setPosition({
          x: data.x,
          y: data.y,
        });

        setCursor(() => {
          if (axis === 'y') {
            if (data.y === 0) return 's';
            if (data.y === props.wrapperHeight - height) return 'n';
            return 'ns';
          } else {
            if (data.x === 0) return 'e';
            if (data.x === props.wrapperWidth - width) return 'w';
            return 'ew';
          }
        });
      },
    [props.wrapperHeight, props.wrapperWidth]
  );

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
      position={position}
      onDrag={handleDrag(axis, width, height)}
    >
      <span
        className={cc([
          styles['draggable-img'],
          styles[`draggable-img--${axis}`],
          styles[`draggable-img--cursor-${cursor}`],
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
