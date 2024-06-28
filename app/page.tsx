'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Draggable from 'react-draggable';
import cc from 'classcat';
import { useImageGeneration } from '@/hooks/useGenerateImg';

const useImg = (src: string, wrapperSize = 1000) => {
  const [{ originWidth, originHeight }, setSrcSize] = useState({
    originWidth: 0,
    originHeight: 0,
  });

  useEffect(() => {
    if (!!src) {
      const imageDom = document.createElement('img');
      imageDom.setAttribute('src', src);

      imageDom.onload = () => {
        const { naturalWidth, naturalHeight } = imageDom;

        setSrcSize({
          originWidth: naturalWidth,
          originHeight: naturalHeight,
        });
      };
    }
  }, [src]);

  if (!src || originWidth === 0 || originHeight === 0) return null;

  const orientation = originHeight / originWidth > 1 ? 'portrait' : 'landscape';
  const computedWidth =
    orientation === 'landscape'
      ? (originWidth * wrapperSize) / originHeight
      : wrapperSize;
  const computedHeight =
    orientation === 'portrait'
      ? (originHeight * wrapperSize) / originWidth
      : wrapperSize;

  return (
    <Draggable
      axis={orientation === 'landscape' ? 'x' : 'y'}
      bounds={{
        left: wrapperSize - computedWidth,
        top: wrapperSize - computedHeight,
        right: 0,
        bottom: 0,
      }}
    >
      <span className={cc([styles['image'], styles[`image--${orientation}`]])}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles['image__source']}
          src={src}
          alt="cover"
          width={computedWidth}
          height={computedHeight}
        />
      </span>
    </Draggable>
  );
};

const TextInput = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input onChange={onChange} />;
};
const ImgInput = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type="file" onChange={onChange} />;
};

export default function Home() {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');

  const img = useImg(src);

  const [generateImage] = useImageGeneration(imgWrapperRef, 'test', {
    width: 1000,
    height: 1000,
  });

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <ImgInput
          onChange={(e) => {
            if (!e.target.files) return;
            const url = URL.createObjectURL(e.target.files[0]);
            setSrc(url);
          }}
        />
        <TextInput onChange={(e) => setTitle(e.target.value)} />
        <button onClick={generateImage}>generate</button>
      </div>
      <div className={styles['img-wrapper']} ref={imgWrapperRef}>
        <h1 className={styles['img-heading']}>{title}</h1>
        {img}
      </div>
    </main>
  );
}
