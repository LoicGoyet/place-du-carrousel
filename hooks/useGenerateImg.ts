// @ts-ignore
import domtoimage from 'dom-to-image-more';

export const useImageGeneration = (
  ref: React.RefObject<HTMLDivElement>,
  title: string,
  options = {}
) => {
  const generateImage = (e: React.MouseEvent) => {
    e.preventDefault();

    domtoimage.toJpeg(ref.current, options).then((dataUrl: string) => {
      const link = document.createElement('a');
      link.download = `${title}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  };

  return [generateImage];
};
