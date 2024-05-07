import React, { useState } from 'react';
import './Registration.scss';
import { FaUser } from 'react-icons/fa';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../Button/Button';
import { RegistrationRow } from '../RegistrationRow/RegistrationRow';

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
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name === 'email' && userData.username === '' ) {
      const updatedUsername = event.target.value.substring(0, event.target.value.indexOf('@'));
      setUserData({ ...userData, username: updatedUsername, [event.target.name]: event.target.value.trim() });
      setUserDataErr({ ...userDataErr, emailErr: '' });
      updatedUsername && setUserDataErr({ ...userDataErr, usernameErr: '', emailErr: '' });
    } else {
      setUserData({ ...userData, [event.target.name]: event.target.value.trim() });
      setUserDataErr({ ...userDataErr, [`${event.target.name}Err`]: '' });
    }
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
    } else if (!emailRegex.test(userData.email)) {
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

    toast.success(`Success, open you the console, press key F12 :)`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

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
        <RegistrationRow errMsg={userDataErr.emailErr} type="text" name="email" value={userData.email} onChange={handleChange} placeholder="Email Address" />
        <RegistrationRow errMsg={userDataErr.usernameErr} type="text" name="username" value={userData.username} onChange={handleChange} placeholder="User Name" />
        <RegistrationRow errMsg={userDataErr.passwordErr} type={`${isShowPass ? 'text' : 'password'}`} name="password" value={userData.password} onChange={handleChange} placeholder="Password" isShowPass={isShowPass} handleShowPass={handleShowPass} />
        <RegistrationRow errMsg={userDataErr.passwordConfirmErr} type="password" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleChange} placeholder="Confirm Password" />
      </div>
      <Button handleClick={handleClick} />
    </form>
  );
};