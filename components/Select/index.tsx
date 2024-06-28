import React, { ReactElement } from 'react';

interface SelectProps {
  children: ReactElement[] | ReactElement;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Select: React.FC<SelectProps> = (props) => {
  React.Children.forEach(props.children, (child) => {
    if (React.isValidElement(child) && child.type !== 'option') {
      console.error(
        'Select component children should be <option> elements only.'
      );
    }
  });

  return (
    <select onChange={props.onChange} value={props.value}>
      {props.children}
    </select>
  );
};

export default Select;
