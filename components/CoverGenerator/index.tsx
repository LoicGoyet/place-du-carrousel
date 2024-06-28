'use client';

import { useImageGeneration } from '@/hooks/useGenerateImg';
import * as React from 'react';
import styles from './index.module.css';
import Cover from '../Cover';
import ImgInput from '../ImgInput';
import TextInput from '../TextInput';

export default function CoverGenerator() {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = React.useState('');
  const [title, setTitle] = React.useState('');

  const generateImage = useImageGeneration(coverRef, 'test', {
    width: 1000,
    height: 1000,
  });

  return (
    <React.Fragment>
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

      <Cover title={title} src={src} ref={coverRef} />
    </React.Fragment>
  );
}
