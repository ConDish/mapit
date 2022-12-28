type Props = {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
};
function Radio({ name, value, onChange, checked }: Props) {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
      onChange={onChange}
      checked={checked}
    />
  );
}

export default Radio;
