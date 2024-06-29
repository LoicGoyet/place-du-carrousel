'use client';

import { useImageGeneration } from '@/hooks/useGenerateImg';
import * as React from 'react';
import styles from './index.module.css';
import Cover from '../Cover';
import FileInput from '../FileInput';
import Input from '../Input';
import { useForm } from './useForm';
import Select from '../Select';
import { coverShapes, isInShapeComposition } from '@/data/cover';
import Button from '../Button';
import cc from 'classcat';
import { BarLoader } from 'react-spinners';

export default function CoverGenerator() {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const {
    values,
    actions,
    selectors: { isSubmitting, isError, isSuccess },
  } = useForm();

  const generateImage = useImageGeneration(coverRef, values.shape);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (isSubmitting) return null;
      e.preventDefault();

      try {
        actions.submit();
        await generateImage();
        actions.submitSuccess();
      } catch {
        actions.submitFailure();
      }
    },
    [isSubmitting, actions, generateImage]
  );

  return (
    <div className={styles['cover-generator']}>
      <Cover
        className={styles['cover-generator__cover']}
        title={values.title}
        img={values.img}
        shape={values.shape}
        ref={coverRef}
      />

      <form className={styles['cover-generator__form']} onSubmit={handleSubmit}>
        <Select value={values.shape} onChange={actions.updateShape}>
          {(Object.keys(coverShapes) as Array<keyof typeof coverShapes>).map(
            (shape) => {
              const label = coverShapes[shape].label;
              return (
                <option key={shape} value={shape}>
                  {label}
                </option>
              );
            }
          )}
        </Select>
        <FileInput value={values.img} onChange={actions.updateImg} />

        {isInShapeComposition(values.shape, 'title') ? (
          <Input
            value={values.title}
            onChange={actions.updateTitle}
            placeholder="Titre"
          />
        ) : null}

        <div className={styles['form__action-bar']}>
          {isError ? (
            <p
              className={cc([
                styles['form__status'],
                styles['form__status--error'],
              ])}
            >
              Erreur dans la génération de l&apos;image
            </p>
          ) : null}

          {isSuccess ? (
            <p
              className={cc([
                styles['form__status'],
                styles['form__status--success'],
              ])}
            >
              Image téléchargée !
            </p>
          ) : null}

          <Button
            type="submit"
            className={styles['form__submit']}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <BarLoader color="#ffffff" width={58.695} />
            ) : (
              'Générer'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
