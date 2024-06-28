import styles from './index.module.css';

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: React.InputHTMLAttributes<HTMLInputElement>['value'];
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
};

const Input = ({ onChange, value, placeholder }: Props) => {
  return (
    <input
      className={styles['input']}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
