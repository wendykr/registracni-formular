import './PassToggle.scss';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface PassToggleProps {
  isShowPass: boolean;
  handleShowPass: () => void;
}

export const PassToggle: React.FC <PassToggleProps> = ({ isShowPass, handleShowPass }) => {

  return (
    isShowPass ? <FaEyeSlash className="icon-eye" onClick={handleShowPass} title="Hidden pass" /> : <FaEye className="icon-eye" onClick={handleShowPass} title="Show pass"/>
  )
}