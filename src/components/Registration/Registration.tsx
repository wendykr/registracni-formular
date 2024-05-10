import React, { useState, useEffect } from 'react';
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

export const Registration: React.FC = () => {
  const [userData, setUserData] = useState<RegistrationStructure>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidPasswordConfirm, setIsInvalidPasswordConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (userData.email === '' ||
        userData.username === '' ||
        userData.password === '' ||
        userData.passwordConfirm === '' ||
        isInvalidEmail ||
        isInvalidUsername ||
        isInvalidPassword ||
        isInvalidPasswordConfirm
      ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }

  }, [userData, isInvalidEmail, isInvalidUsername, isInvalidPassword, isInvalidPasswordConfirm])

  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    (!emailRegex.test(event.target.value.trim()))
      ?
        setIsInvalidEmail(true)
      :
        setIsInvalidEmail(false)

    if (!userData.username) {
      const updatedUsername = event.target.value.substring(0, event.target.value.indexOf('@'));
      setUserData({ ...userData, username: updatedUsername, email: event.target.value.trim() });
      updatedUsername && setIsInvalidUsername(false);
    } else {
      setUserData({ ...userData, email: event.target.value.trim() });
    }
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, username: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidUsername(false)
      : 
        setIsInvalidUsername(true);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: event.target.value.trim() });
    (event.target.value.trim())
      ?
        setIsInvalidPassword(false)
      :
        setIsInvalidPassword(true);
  };

  const handleChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    (userData.password !== event.target.value.trim() || event.target.value.trim() === '')
      ?
        setIsInvalidPasswordConfirm(true)
      :
        setIsInvalidPasswordConfirm(false);
    setUserData({ ...userData, passwordConfirm: event.target.value.trim() });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

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

    setIsShowPass(false);
    setIsButtonDisabled(true);

    setUserData({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const handleShowPass = () => {
    setIsShowPass(prev => !prev);
  }

  return (
    <form className="form">
      <div className="form__header">
        <div className="form__header--inner">
          <FaUser className="icon-user" />
        </div>
      </div>
      <div className="form__body">

        <RegistrationRow
          isValid={isInvalidEmail}
          errMsg={`${(!emailRegex.test(userData.email) && userData.email !== '') ? 'Invalid email format' : 'Email is required'}`}
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChangeEmail}
          placeholder="Email Address"
        />

        <RegistrationRow
          isValid={isInvalidUsername}
          errMsg="Username is required"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChangeUsername}
          placeholder="User Name"
        />

        <RegistrationRow
          isValid={isInvalidPassword}
          errMsg="Password is required"
          type={`${isShowPass ? 'text' : 'password'}`}
          name="password"
          value={userData.password}
          onChange={handleChangePassword}
          placeholder="Password"
          isShowPass={isShowPass}
          handleShowPass={handleShowPass}
        />

        <RegistrationRow
          isValid={isInvalidPasswordConfirm}
          errMsg={`${(userData.password !== userData.passwordConfirm) ? 'Passwords don´t match' : 'Please confirm your password'}`}
          type="password"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onChange={handleChangePasswordConfirm}
          placeholder="Confirm Password"
        />

      </div>
      <Button
        handleClick={handleClick}
        isButtonDisabled={isButtonDisabled}
      />
    </form>
  );
};