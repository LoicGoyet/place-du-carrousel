// value divided by 2
// but on generation they will have the good size
export const coverShapes = {
  square: {
    label: 'Carré',
    width: 540,
    height: 540,
  },
  twitter: {
    label: 'Post twitter',
    width: 600,
    height: 337.5,
  },
  'story-instagram': {
    label: 'Story Instagram',
    width: 540,
    height: 960,
  },
};

export const isCoverShape = (
  shape: string
): shape is keyof typeof coverShapes => {
  return shape in coverShapes;
};
