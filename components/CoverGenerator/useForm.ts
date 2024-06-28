import { coverShapes, isCoverShape } from '@/data/cover';
import * as React from 'react';

type FormState = {
  img: string;
  title: string;
  subtitle: string;
  shape: keyof typeof coverShapes;
};

const initialState: FormState = {
  img: '',
  title: '',
  subtitle: '',
  shape: 'square',
};

type Action =
  | { type: 'SET_IMG'; payload: string }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_SUBTITLE'; payload: string }
  | { type: 'SET_SHAPE'; payload: FormState['shape'] };

const reducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_IMG':
      return { ...state, img: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_SUBTITLE':
      return { ...state, subtitle: action.payload };
    case 'SET_SHAPE':
      return { ...state, shape: action.payload };
    default:
      return state;
  }
};

export const useForm = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const updateImg = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const img = URL.createObjectURL(e.target.files[0]);
      dispatch({ type: 'SET_IMG', payload: img });
    },
    [dispatch]
  );

  const updateTitle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_TITLE', payload: e.target.value });
    },
    [dispatch]
  );

  const updateSubtitle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_SUBTITLE', payload: e.target.value });
    },
    [dispatch]
  );

  const updateShape = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      if (!isCoverShape(value)) return;

      dispatch({
        type: 'SET_SHAPE',
        payload: value,
      });
    },
    [dispatch]
  );

  return {
    values: {
      img: state.img,
      title: state.title,
      subtitle: state.subtitle,
      shape: state.shape,
    },
    actions: { updateImg, updateTitle, updateSubtitle, updateShape },
  };
};
