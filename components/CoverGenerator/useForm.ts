import * as React from 'react';

type FormState = {
  img: string;
  title: string;
};

const initialState: FormState = {
  img: '',
  title: '',
};

type Action =
  | { type: 'SET_IMG'; payload: string }
  | { type: 'SET_TITLE'; payload: string };

const reducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_IMG':
      return { ...state, img: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
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

  return {
    values: {
      img: state.img,
      title: state.title,
    },
    actions: { updateImg, updateTitle },
  };
};
