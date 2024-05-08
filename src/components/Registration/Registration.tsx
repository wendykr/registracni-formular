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

export const Registration: React.FC = () => {
  const [userData, setUserData] = useState<RegistrationStructure>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  const [isInvalidPasswordConfirm, setIsInvalidPasswordConfirm] = useState<boolean>(false);

  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.name === 'email') {
      (!emailRegex.test(event.target.value.trim())) ? setIsInvalidEmail(true) : setIsInvalidEmail(false)

      if (!userData.username) {
        const updatedUsername = event.target.value.substring(0, event.target.value.indexOf('@'));
        setUserData({ ...userData, username: updatedUsername, [event.target.name]: event.target.value.trim() });
        setIsInvalidEmail(true);
      } else {
        setUserData({ ...userData, [event.target.name]: event.target.value.trim() });
      }
    }

    if (event.target.name === 'username') {
      setUserData({ ...userData, [event.target.name]: event.target.value.trim() });
      (event.target.value.trim()) ? setIsInvalidUsername(false) : setIsInvalidUsername(true);
    }

    if (event.target.name === 'password') {
      setUserData({ ...userData, [event.target.name]: event.target.value.trim() });
      (event.target.value.trim()) ? setIsInvalidPassword(false) : setIsInvalidPassword(true);
    }
    
    if (event.target.name === 'passwordConfirm') {
      if (userData.password !== event.target.value.trim() || event.target.value.trim() === '') {
        setIsInvalidPasswordConfirm(true);
      } else {
        setIsInvalidPasswordConfirm(false);
      }
      setUserData({ ...userData, [event.target.name]: event.target.value.trim() });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (userData.username === '') {
      setIsInvalidUsername(true);
    }

    if (userData.email === '') {
      setIsInvalidEmail(true);
    } else if (!emailRegex.test(userData.email)) {
      setIsInvalidEmail(true);
    }

    if (userData.password === '') {
      setIsInvalidPassword(true);
    }

    if (userData.passwordConfirm === '') {
      setIsInvalidPasswordConfirm(true);
    } else if (userData.password !== userData.passwordConfirm) {
      setIsInvalidPasswordConfirm(true);
    }

    if (userData.username === '' || userData.email === '' || !emailRegex.test(userData.email) || userData.password === '' || userData.passwordConfirm === ''|| (userData.password !== userData.passwordConfirm)) {
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

    setIsShowPass(false);

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
          onChange={handleChange}
          placeholder="Email Address"
        />
        <RegistrationRow
          isValid={isInvalidUsername}
          errMsg="Username is required"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="User Name"
        />
        <RegistrationRow
          isValid={isInvalidPassword}
          errMsg="Password is required"
          type={`${isShowPass ? 'text' : 'password'}`}
          name="password"
          value={userData.password}
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Confirm Password"
        />
      </div>
      <Button
        handleClick={handleClick}
      />
    </form>
  );
};