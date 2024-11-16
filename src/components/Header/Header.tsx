import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import {  FaHeart, FaUserCircle } from "react-icons/fa";
import { MdClear } from 'react-icons/md';
import { TextField, Button, Badge } from '@mui/material';
import { BsEarbuds } from 'react-icons/bs';
import { useAppSelector } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { FaCartShopping } from 'react-icons/fa6';
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const favorites = useAppSelector((state) => state.Todo.favorites);
  const items = useAppSelector((state) => state.Todo.items);
  const nav = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chek, setChek] = useState(false);
  const [password, setPassword] = useState('');
  const [isGmailVisible, setGmailVisible] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const closeMainGmail = () => setGmailVisible(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handlePasswordSubmit = () => {
    if (password === 'Kabylbek05') {
      nav('/admin');
      closeMainGmail();
    } else if (!password) {
      alert(t('Enter password!'));
    } else {
      alert(t('Incorrect password!'));
    }
  };

  return (
    <header>
      <div className="container">
        <div className="header">
          <nav className="bg-white text-black p-[20px]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <Link to='/'>
                <h1 className='headerH1'>iStore</h1>
              </Link>

              {isMobileMenuOpen && (
                <div className="fixed top-16 right-4 z-99 bg-white shadow-lg p-4 rounded-lg w-48">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/home">
                        <a onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded">
                          {t('Accessories')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contacts">
                        <a onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded">
                          {t('Contact')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/favorite">
                        <a onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded">
                          {t('Favorite')}
                        </a>
                      </Link>
                    </li>
                    <li>
                    <Link to="/basket">
                        <a onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded">
                          {t('Basket')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a onClick={() => {
                        setGmailVisible(!isGmailVisible);
                        toggleMobileMenu();
                      }} className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded">
                        <FaUserCircle />
                      </a>
                    </li>
                    <div className="language-switcher">
                  <select value={language} onChange={handleLanguageChange}>
                    <option value="kgz">KG</option>
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                  </select>
                </div>
                  </ul>
                </div>
              )}

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/home" className="flex flex-col items-center text-gray-900 hover:text-blue-700">
                  <Badge color="primary">
                    <BsEarbuds className="text-2xl" />
                  </Badge>
                  <span>{t('Accessories')}</span>
                </Link>

                <Link to="/favorite" className="flex flex-col items-center text-gray-900 hover:text-blue-700">
                  {favorites.length > 0 ? (
                    <Badge badgeContent={favorites.length} color="primary">
                      <FaHeart className="text-2xl" />
                    </Badge>
                  ) : (
                    <FaHeart className="text-2xl" />
                  )}
                  <span>{t('Wishlist')}</span>
                </Link>

                <Link to="/basket" className="flex flex-col items-center text-gray-900 hover:text-blue-700">
                  {items.length > 0 ? (
                    <Badge badgeContent={items.length} color="primary">
                      <FaCartShopping className="text-2xl" />
                    </Badge>
                  ) : (
                    <FaCartShopping className="text-2xl" />
                  )}
                  <span>{t('Basket')}</span>
                </Link>
                <a onClick={() => setGmailVisible(!isGmailVisible)} className="flex flex-col items-center text-gray-900 hover:text-blue-700">
                  <FaUserCircle className="text-2xl" />
                  <span>{t('Admin')}</span>
                </a>
                
                <div className="language-switcher">
                  <select value={language} onChange={handleLanguageChange}>
                    <option value="kgz">KG</option>
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                  </select>
                </div>

              </div>
<button onClick={toggleMobileMenu} className='headerBtn'><RxHamburgerMenu /></button>

            </div>
          </nav>

        </div>

        {isGmailVisible && (
          <div className="Maingmail">
            <div className="gmail">
              <div className="input-pas">
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  label={t('Password')}
                  type={chek ? 'text' : 'password'}
                  autoComplete="current-password"
                />
                <div className="div">
                  <input
                    onClick={() => setChek(!chek)}
                    className="chekbox"
                    type="checkbox"
                  />
                  <Button onClick={handlePasswordSubmit} variant="outlined">
                    {t('Enter')}
                  </Button>
                  <button className="clear" onClick={closeMainGmail}>
                    <MdClear />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
