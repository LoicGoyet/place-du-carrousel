export const coverShapes = {
  square: {
    width: 1080,
    height: 1080,
  },
  twitter: {
    width: 1408,
    height: 792,
  },
  'story-instagram': {
    width: 1080,
    height: 1920,
  },
};

export const isCoverShape = (
  shape: string
): shape is keyof typeof coverShapes => {
  return shape in coverShapes;
};
