'use client';

import { useImageGeneration } from '@/hooks/useGenerateImg';
import * as React from 'react';
import styles from './index.module.css';
import Cover from '../Cover';
import ImgInput from '../ImgInput';
import TextInput from '../TextInput';
import { useForm } from './useForm';

export default function CoverGenerator() {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const { values, actions } = useForm();

  const generateImage = useImageGeneration(coverRef, 'test', {
    width: 1000,
    height: 1000,
  });

  return (
    <React.Fragment>
      <div className={styles.form}>
        <ImgInput value={values.img} onChange={actions.updateImg} />
        <TextInput value={values.title} onChange={actions.updateTitle} />
        <button onClick={generateImage}>generate</button>
      </div>

      <Cover title={values.title} img={values.img} ref={coverRef} />
    </React.Fragment>
  );
}
