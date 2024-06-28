type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const TextInput = ({ onChange, value }: Props) => {
  return <input onChange={onChange} value={value} />;
};

export default TextInput;
