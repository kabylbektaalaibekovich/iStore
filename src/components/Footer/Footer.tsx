import React, { useState } from 'react';
import './Footer.css';
import { GrLanguage } from "react-icons/gr";
import { FaWhatsapp, FaVk, FaInstagram, FaTelegram } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("ru");

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        i18n.changeLanguage(lang); 
    };

    return (
        <footer>
            <div className="container">
                <div className="footer">
                    <div className="footer-card">
                        <h1 className='footerH1'>iStore</h1>

                        <div className="card1">
                            <h1 className='card1-text' onClick={() => navigate('/basket')}>{t('Basket')}</h1>  
                            <h1 className='card1-text'onClick={() => navigate('/favorite')}>{t('Favorite')}</h1>
                            <h1 className='card1-text'onClick={() => navigate('/contacts')}>{t('Contact')}</h1>
                        </div>

                        <div className="card2">
                            <h1 className='card2-text'>{t('Terms of service')}</h1>
                            <div className="card-language">
                                <span className='card-language-icon'><GrLanguage /></span>
                                <span 
                                    className={language === "kgz" ? "active" : ""} 
                                    onClick={() => handleLanguageChange("kgz")}
                                >
                                    КGZ
                                </span>
                                <span 
                                    className={language === "ru" ? "active" : ""} 
                                    onClick={() => handleLanguageChange("ru")}
                                >
                                    RUS
                                </span>
                                <span 
                                    className={language === "en" ? "active" : ""} 
                                    onClick={() => handleLanguageChange("en")}
                                >
                                    ENG
                                </span>
                            </div>
                        </div>

                        <div className="card3">
                            <div className="card-icons">
                                <FaWhatsapp  color='white'/>
                                <FaVk color='white'/>
                                <FaInstagram color='white' />
                               <FaTelegram color='white' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
