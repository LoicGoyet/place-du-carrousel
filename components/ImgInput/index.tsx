type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const ImgInput = (props: Props) => {
  return <input type="file" onChange={props.onChange} />;
};

export default ImgInput;
