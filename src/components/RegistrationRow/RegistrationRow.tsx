import './RegistrationRow.scss'
import { Input, InputProps } from '../Input/Input';
import { PassToggle } from '../PassToggle/PassToggle';

interface RegistrationRowProps extends InputProps {
  errMsg: string;
  isShowPass?: boolean;
  handleShowPass?: () => void;
}

export const RegistrationRow: React.FC<RegistrationRowProps> = ({ errMsg, type, name, value, onChange, placeholder, isShowPass, handleShowPass }) => {

  return (
    <div className="registrationRow">
      {errMsg && <p className="error">{errMsg}</p>}
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      {
        (isShowPass !== undefined && handleShowPass !== undefined) && ((value && name === 'password') && (<PassToggle isShowPass={isShowPass} handleShowPass={handleShowPass} />))
      }
    </div>
  )
}