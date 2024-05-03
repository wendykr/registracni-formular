import React, { useState } from 'react';
import './Registration.scss';
import { FaUser } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface RegistrationStructure {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RegistrationStructureErr {
  usernameErr: string;
  emailErr: string;
  passwordErr: string;
  passwordConfirmErr: string;
}

export const Registration: React.FC = () => {
  const [userData, setUserData] = useState<RegistrationStructure>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [userDataErr, setUserDataErr] = useState<RegistrationStructureErr>({
    usernameErr: '',
    emailErr: '',
    passwordErr: '',
    passwordConfirmErr: '',
  });

  const [isShowPass, SetIsShowPass] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUsername =
    event.target.name === 'email' ? event.target.value.substring(0, event.target.value.indexOf('@')) : userData.username;

    setUserData({ ...userData, username: updatedUsername, [event.target.name]: event.target.value });

    setUserDataErr({ ...userDataErr, [`${event.target.name}Err`]: '' });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newUserDataErr: RegistrationStructureErr = {
      usernameErr: '',
      emailErr: '',
      passwordErr: '',
      passwordConfirmErr: '',
    };

    if (userData.username === '') {
      newUserDataErr.usernameErr = 'Username is required';
    }

    if (userData.email === '') {
      newUserDataErr.emailErr = 'Email is required';
    } else if (!userData.email.includes('@')) {
      newUserDataErr.emailErr = 'Invalid email format';
    }

    if (userData.password === '') {
      newUserDataErr.passwordErr = 'Password is required';
    }

    if (userData.passwordConfirm === '') {
      newUserDataErr.passwordConfirmErr = 'Please confirm your password';
    } else if (userData.password !== userData.passwordConfirm) {
      newUserDataErr.passwordConfirmErr = `Passwords don't match`;
    }

    setUserDataErr(newUserDataErr);

    if (
      newUserDataErr.usernameErr ||
      newUserDataErr.emailErr ||
      newUserDataErr.passwordErr ||
      newUserDataErr.passwordConfirmErr
    ) {
      return;
    }

    console.log('userData:', userData);

    SetIsShowPass(false);

    setUserData({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    setUserDataErr({
      usernameErr: '',
      emailErr: '',
      passwordErr: '',
      passwordConfirmErr: '',
    });
  };

  const handleShowPass = () => {
    SetIsShowPass(prev => !prev);
  }

  return (
    <form className="form">
      <div className="form__header">
        <div className="form__header--inner">
          <FaUser className="icon-user" />
        </div>
      </div>
      <div className="form__body">
        <div className="form__row">
          {userDataErr.emailErr && <p className="error">{userDataErr.emailErr}</p>}
          <input
            className="form__input"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </div>

        <div className="form__row">
          {userDataErr.usernameErr && <p className="error">{userDataErr.usernameErr}</p>}
          <input
            className="form__input"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="User Name"
          />
        </div>

        <div className="form__row">
          {userDataErr.passwordErr && <p className="error">{userDataErr.passwordErr}</p>}
          <input
            className="form__input"
            type={`${isShowPass ? 'text' : 'password'}`}
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {
            userData.password &&  (isShowPass ? <FaEyeSlash className="icon-eye" onClick={handleShowPass} /> : <FaEye className="icon-eye" onClick={handleShowPass} />)
          }
        </div>

        <div className="form__row">
          {userDataErr.passwordConfirmErr && (<p className="error">{userDataErr.passwordConfirmErr}</p>)}
          <input
            className="form__input"
            type="password"
            name="passwordConfirm"
            value={userData.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <button className="button" onClick={handleClick}>
        Register
      </button>
    </form>
  );
};