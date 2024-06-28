import styles from './index.module.css';

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const FileInput = (props: Props) => {
  return (
    <input
      className={styles['file-input']}
      type="file"
      onChange={props.onChange}
    />
  );
};

export default FileInput;
