'use client';

import { useImageGeneration } from '@/hooks/useGenerateImg';
import * as React from 'react';
import styles from './index.module.css';
import Cover from '../Cover';
import ImgInput from '../ImgInput';
import TextInput from '../TextInput';
import { useForm } from './useForm';
import Select from '../Select';
import { coverShapes } from '@/data/cover';

export default function CoverGenerator() {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const { values, actions } = useForm();
  const { width, height } = coverShapes[values.shape];

  const generateImage = useImageGeneration(coverRef, 'test', {
    width,
    height,
  });

  return (
    <React.Fragment>
      <div className={styles.form}>
        <Select value={values.shape} onChange={actions.updateShape}>
          {Object.keys(coverShapes).map((shape) => (
            <option key={shape} value={shape}>
              {shape}
            </option>
          ))}
        </Select>
        <ImgInput value={values.img} onChange={actions.updateImg} />
        <TextInput value={values.title} onChange={actions.updateTitle} />
        <button onClick={generateImage}>generate</button>
      </div>

      <Cover
        title={values.title}
        img={values.img}
        shape={values.shape}
        ref={coverRef}
      />
    </React.Fragment>
  );
}
