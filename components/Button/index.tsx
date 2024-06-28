import styles from './index.module.css';
import cc from 'classcat';

type Props = {
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  children: React.ButtonHTMLAttributes<HTMLButtonElement>['children'];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: React.ButtonHTMLAttributes<HTMLButtonElement>['className'];
};

const Button = ({ onClick, children, type, className }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cc([styles['button'], className])}
    >
      {children}
    </button>
  );
};

export default Button;
