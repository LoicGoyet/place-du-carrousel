// value divided by 2
// but on generation they will have the good size
export const coverShapes = {
  square: {
    width: 540,
    height: 540,
  },
  twitter: {
    width: 600,
    height: 337.5,
  },
  'story-instagram': {
    width: 540,
    height: 960,
  },
};

export const isCoverShape = (
  shape: string
): shape is keyof typeof coverShapes => {
  return shape in coverShapes;
};
