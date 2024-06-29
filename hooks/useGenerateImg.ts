// @ts-ignore
import domtoimage from 'dom-to-image-more';
import * as React from 'react';
// @ts-ignore
import { changeDpiDataUrl } from 'changedpi';

const scale = 2;
const BASE_DPI = 300;

export const useImageGeneration = (
  ref: React.RefObject<HTMLDivElement>,
  title: string
) => {
  const generateImage = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;

    return domtoimage
      .toPng(ref.current, {
        height: el.offsetHeight * scale,
        width: el.offsetWidth * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${el.offsetWidth}px`,
          height: `${el.offsetHeight}px`,
        },
      })
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = `${title}.png`;
        link.href = changeDpiDataUrl(dataUrl, BASE_DPI * scale);
        link.click();
      })
      .catch(() => {
        throw new Error('Error generating image');
      });
  }, [ref, title]);

  return generateImage;
};
