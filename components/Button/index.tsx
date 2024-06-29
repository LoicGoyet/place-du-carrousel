import styles from './index.module.css';
import cc from 'classcat';

type Props = {
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: React.ButtonHTMLAttributes<HTMLButtonElement>['children'];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: React.ButtonHTMLAttributes<HTMLButtonElement>['className'];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
};

const Button = ({ onClick, children, type, className, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cc([styles['button'], className])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
