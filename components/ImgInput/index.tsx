const ImgInput = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type="file" onChange={onChange} />;
};

export default ImgInput;
