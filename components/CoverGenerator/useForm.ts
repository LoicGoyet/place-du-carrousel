import { coverShapes, isCoverShape } from '@/data/cover';
import * as React from 'react';

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'failure';
  values: {
    img: string;
    title: string;
    subtitle: string;
    shape: keyof typeof coverShapes;
  };
};

const initialState: FormState = {
  status: 'idle',
  values: {
    img: '',
    title: '',
    subtitle: '',
    shape: 'square',
  },
};

type Action =
  | { type: 'SET_IMG'; payload: string }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_SUBTITLE'; payload: string }
  | { type: 'SET_SHAPE'; payload: FormState['values']['shape'] }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAILURE' };

const reducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_IMG': {
      return {
        ...state,
        status: 'idle',
        values: {
          ...state.values,
          img: action.payload,
        },
      };
    }

    case 'SET_TITLE': {
      return {
        ...state,
        status: 'idle',
        values: { ...state.values, title: action.payload },
      };
    }

    case 'SET_SUBTITLE': {
      return {
        ...state,
        status: 'idle',
        values: { ...state.values, subtitle: action.payload },
      };
    }

    case 'SET_SHAPE': {
      return {
        ...state,
        status: 'idle',
        values: { ...state.values, shape: action.payload },
      };
    }

    case 'SUBMIT': {
      return {
        ...state,
        status: 'submitting',
      };
    }

    case 'SUBMIT_SUCCESS': {
      return {
        ...state,
        status: 'success',
      };
    }

    case 'SUBMIT_FAILURE': {
      return {
        ...state,
        status: 'failure',
      };
    }

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

  const submit = React.useCallback(() => {
    dispatch({ type: 'SUBMIT' });
  }, [dispatch]);

  const submitSuccess = React.useCallback(() => {
    dispatch({ type: 'SUBMIT_SUCCESS' });
  }, [dispatch]);

  const submitFailure = React.useCallback(() => {
    dispatch({ type: 'SUBMIT_FAILURE' });
  }, [dispatch]);

  return {
    values: state.values,
    actions: {
      updateImg,
      updateTitle,
      updateSubtitle,
      updateShape,
      submit,
      submitSuccess,
      submitFailure,
    },
    selectors: {
      isSubmitting: state.status === 'submitting',
      isSuccess: state.status === 'success',
      isError: state.status === 'failure',
      isIdle: state.status === 'idle',
    },
  };
};
