'use client';

import { useImageGeneration } from '@/hooks/useGenerateImg';
import * as React from 'react';
import styles from './index.module.css';
import Cover from '../Cover';
import FileInput from '../FileInput';
import Input from '../Input';
import { useForm } from './useForm';
import Select from '../Select';
import { coverShapes } from '@/data/cover';
import Button from '../Button';

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
      <form className={styles.form} onSubmit={generateImage}>
        <Select value={values.shape} onChange={actions.updateShape}>
          {Object.keys(coverShapes).map((shape) => (
            <option key={shape} value={shape}>
              {shape}
            </option>
          ))}
        </Select>
        <FileInput value={values.img} onChange={actions.updateImg} />
        <Input
          value={values.title}
          onChange={actions.updateTitle}
          placeholder="Titre"
        />
        <Button type="submit" className={styles['form__submit']}>
          Generate
        </Button>
      </form>

      <Cover
        title={values.title}
        img={values.img}
        shape={values.shape}
        ref={coverRef}
      />
    </React.Fragment>
  );
}
