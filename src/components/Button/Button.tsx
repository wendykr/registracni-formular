import './Button.scss';

interface ButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isInvalidEmail: boolean;
  isInvalidUsername: boolean;
  isInvalidPassword: boolean;
  isInvalidPasswordConfirm: boolean;
}

export const Button: React.FC<ButtonProps> = ({ handleClick, isInvalidEmail, isInvalidUsername, isInvalidPassword, isInvalidPasswordConfirm }) => {

  return (
    <button className="button" onClick={handleClick} disabled={isInvalidEmail || isInvalidUsername || isInvalidPassword || isInvalidPasswordConfirm}>
      Register
    </button>
  )
}