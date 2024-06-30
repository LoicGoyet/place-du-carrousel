// value divided by 2
// but on generation they will have the good size
export const coverShapes = {
  square: {
    label: 'Carré',
    width: 540,
    height: 540,
    imgWidth: 540,
    imgHeight: 540,
    composition: ['img'],
  },
  headliner: {
    label: 'Headliner',
    width: 540,
    height: 540,
    imgWidth: 540,
    imgHeight: 540,
    composition: ['img'],
  },
  twitter: {
    label: 'Post twitter',
    width: 600,
    height: 337.5,
    imgWidth: 600,
    imgHeight: 337.5,
    composition: ['img'],
  },
  'story-instagram': {
    label: 'Story Instagram',
    width: 540,
    height: 960,
    imgWidth: 540,
    imgHeight: 700,
    composition: ['img', 'title'],
  },
};

export const isCoverShape = (
  shape: string
): shape is keyof typeof coverShapes => {
  return shape in coverShapes;
};

export const isInShapeComposition = (
  shape: keyof typeof coverShapes,
  composition: string
) => {
  return coverShapes[shape].composition.includes(composition);
};
