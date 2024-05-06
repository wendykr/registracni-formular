import './Input.scss';

export interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ type, name, value, onChange, placeholder }) => {

  return (
    <input
      className="input"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}