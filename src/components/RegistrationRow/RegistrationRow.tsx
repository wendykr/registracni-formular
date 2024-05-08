import './RegistrationRow.scss'
import { Input, InputProps } from '../Input/Input';
import { PassToggle } from '../PassToggle/PassToggle';

interface RegistrationRowProps extends InputProps {
  isValid: boolean;
  errMsg: string,
  isShowPass?: boolean;
  handleShowPass?: () => void;
}

export const RegistrationRow: React.FC<RegistrationRowProps> = ({ isValid, errMsg, type, name, value, onChange, placeholder, isShowPass, handleShowPass }) => {

  return (
    <div className="registrationRow">
      {isValid && <p className="error">{errMsg}</p>}
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      {
        (isShowPass !== undefined && handleShowPass !== undefined) && ((value && name === 'password') && (<PassToggle isShowPass={isShowPass} handleShowPass={handleShowPass} />))
      }
    </div>
  )
}