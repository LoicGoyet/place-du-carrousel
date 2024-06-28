export const getComputedSize = (
  wrapperWidth: number,
  wrapperHeight: number,
  naturalWidth: number,
  naturalHeight: number
): {
  width: number;
  height: number;
  axis: 'x' | 'y';
} => {
  const imgOrientation =
    naturalHeight / naturalWidth > 1 ? 'portrait' : 'landscape';
  const wrapperOrientation =
    wrapperHeight / wrapperWidth > 1 ? 'portrait' : 'landscape';

  if (imgOrientation === 'portrait' && wrapperOrientation === 'portrait') {
    const scaleHeight = (naturalHeight * wrapperWidth) / naturalWidth;
    if (scaleHeight >= wrapperHeight) {
      return {
        width: wrapperWidth,
        height: scaleHeight,
        axis: 'y',
      };
    } else {
      return {
        width: (naturalWidth * wrapperHeight) / naturalHeight,
        height: wrapperHeight,
        axis: 'x',
      };
    }
  }

  if (imgOrientation === 'landscape' && wrapperOrientation === 'portrait') {
    return {
      width: (naturalWidth * wrapperHeight) / naturalHeight,
      height: wrapperHeight,
      axis: 'x',
    };
  }

  if (imgOrientation === 'portrait' && wrapperOrientation === 'landscape') {
    return {
      width: wrapperWidth,
      height: (naturalHeight * wrapperWidth) / naturalWidth,
      axis: 'y',
    };
  }

  const scaleWidth = (naturalWidth * wrapperHeight) / naturalHeight;

  if (scaleWidth >= wrapperWidth) {
    return {
      width: scaleWidth,
      height: wrapperHeight,
      axis: 'x',
    };
  } else {
    return {
      width: wrapperWidth,
      height: (naturalHeight * wrapperWidth) / naturalWidth,
      axis: 'y',
    };
  }
};
