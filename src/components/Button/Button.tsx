import './Button.scss';

interface ButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isButtonDisabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({ handleClick, isButtonDisabled }) => {

  return (
    <button className="button"
            onClick={handleClick}
            disabled={isButtonDisabled}>
      Register
    </button>
  )
}