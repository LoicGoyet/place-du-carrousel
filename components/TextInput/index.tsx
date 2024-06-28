const TextInput = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input onChange={onChange} />;
};

export default TextInput;
