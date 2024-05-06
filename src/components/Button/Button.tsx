import './Button.scss';

interface ButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ handleClick }) => {

  return (
    <button className="button" onClick={handleClick}>
      Register
    </button>
  )
}