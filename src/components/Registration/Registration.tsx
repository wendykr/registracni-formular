import { useState } from 'react';
import './Registration.scss';
import { FaUser } from "react-icons/fa6";

interface RegistrationStructure {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const Registration: React.FC = () => {
  const [userData, setUserData] = useState<RegistrationStructure>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const updatedUsername = event.target.name === 'email' ? event.target.value.substring(0, event.target.value.indexOf('@')) : userData.username;

    if (updatedUsername.length > 0) {
      setUserData({ ...userData, username: updatedUsername, [event.target.name]: event.target.value });
    } else {
      setUserData({ ...userData, [event.target.name]: event.target.value });
      return;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    if (userData.username === '') {
      console.log('empty username');
      return;
    } else if (userData.email === '') {
      console.log('empty email');
      return;
    } else if (userData.password === '') {
      console.log('empty password');
      return;
    } else if (userData.passwordConfirm === '') {
      console.log('empty passwordConfirm');
      return;
    } else {
      console.log(userData);
    }

    console.log('set default userData');
    setUserData({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })
  }

  return (
    <form className="form">
      <div className="form__header">
        <div className="form__header--inner">
          <FaUser className="icon-user" />
        </div>
      </div>
      <div className="form__body">
        <input className="form__input" type="text" name="email" value={userData.email} onChange={handleChange} placeholder="Email Address"></input>
        <input className="form__input" type="text" name="username" value={userData.username} onChange={handleChange} placeholder="User Name"></input>
        <input className="form__input" type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password"></input>
        <input className="form__input" type="password" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleChange} placeholder="Confirm Password"></input>
      </div>
      <button className="button" onClick={handleClick}>Register</button>
    </form>
  )
}