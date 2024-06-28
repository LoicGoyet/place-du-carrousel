// @ts-ignore
import domtoimage from 'dom-to-image-more';
import * as React from 'react';

export const useImageGeneration = (
  ref: React.RefObject<HTMLDivElement>,
  title: string,
  options = {}
) => {
  const generateImage = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      domtoimage.toJpeg(ref.current, options).then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = `${title}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
    },
    [ref, title, options]
  );

  return generateImage;
};
