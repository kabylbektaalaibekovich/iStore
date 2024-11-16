import './Basket.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/store';
import { removeFromBasket, incrementQuantity, decrementQuantity } from '../../../../redux/Slices/TodoSlices';
import { MdDelete, MdLocationOn } from "react-icons/md";
import basket from '../../../../assets/basket.png';
import { useNavigate } from 'react-router';
import { MdLocalPhone } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Basket = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useAppSelector((state) => state.Todo.items);
    const total = items.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);
    const discount = 0.1 * total;
    const totalWithDiscount = total - discount;
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderSent, setOrderSent] = useState(false);
    const [basCity, setBasCity] = useState('');
    const [basLastName, setBasLastName] = useState('');
    const [basName, setBasName] = useState('');
    const [basEmail, setBasEmail] = useState('');
    const [basNumber, setBasNumber] = useState('');

    const [errors, setErrors] = useState({
        basCity: false,
        basLastName: false,
        basName: false,
        basEmail: false,
        basNumber: false,
    });

    const validateFields = () => {
        const newErrors = {
            basCity: basCity.trim() === '',
            basLastName: basLastName.trim() === '',
            basName: basName.trim() === '',
            basEmail: basEmail.trim() === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(basEmail),
            basNumber: basNumber.trim() === '' || !/^\+996\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$|^\+996\d{9,12}$/.test(basNumber),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const handleOrderClick = () => {
        if (validateFields()) {
            setModalVisible(true); 
        }
    };

    async function addTelegram() {
        setLoading(true);
        const my_id = "-1002466876552";
        const token = "8114570114:AAHQ1IjzThkLF2-yAXdXGBMeswbAICcAyLw";

        try {
            for (const item of items) {
                const productDetails = `
                    Product: ${item.name}
                    Category: ${item.category}
                    Quantity: ${item.quantity}
                    Price: ${item.price} $
                `;

                const productData = {
                    chat_id: my_id,
                    parse_mode: "html",
                    caption: productDetails,
                    photo: item.prod,
                };

                const url_api = `https://api.telegram.org/bot${token}/sendPhoto`;
                await axios.post(url_api, productData);
            }

            const orderSummaryText = `
                Order Summary:
                Address: ${basCity}
                Last Name: ${basLastName}
                Name: ${basName}
                Email: ${basEmail}
                Number: ${basNumber}
                Total Price: ${totalWithDiscount.toFixed(2)} $
            `;
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: my_id,
                parse_mode: "html",
                text: orderSummaryText,
            });

            setLoading(false);
            setOrderSent(true);
            setTimeout(() => {
                setOrderSent(false);
                setModalVisible(false);
            }, 2000);

        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }

        setBasCity('');
        setBasLastName('');
        setBasName('');
        setBasEmail('');
        setBasNumber('');
    }

    return (
        <section className="basket">
            <div className="container">
                {items.length > 0 ? (
                    <ul className="basket-list">
                        <h1 className="basket-title">{t('Корзина')}</h1> -
                        <span>{items.length} {t('шт.')}</span> 
                        {items.map((item) => (
                            <li key={item._id} className="cartItem">
                                <img className="productImage" src={item.prod} alt={item.name} />
                                <div className="productDetails">
                                    <h3 className="productName">{item.name}</h3>
                                    <p className="productDescription">{item.category}</p>
                                    <div className="basket-item-quantity">
                                        <button className="quantity-btn" onClick={() => dispatch(decrementQuantity(item._id))}>-</button>
                                        <span className="quantity">{item.quantity ?? 1}</span>
                                        <button className="quantity-btn" onClick={() => dispatch(incrementQuantity(item._id))}>+</button>
                                    </div>
                                    <p className="currentPrice">{item.price} $</p>
                                </div>
                                <button className="delBtn" onClick={() => dispatch(removeFromBasket(item._id))}>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="basketEmpty">
                        <img className="basketEmtyImg" src={basket} alt={t('Пустая корзина')} />
                        <h1 className="basketEmptyH1">{t('Корзина пуста')}</h1>
                        <p className="basketEmptyp">{t('Но всегда можно это исправить :)')}</p>
                        <button className="basketEmptypBtn" onClick={() => navigate('/home')}>{t('Перейти в каталог')}</button>
                    </div>
                )}

                <div className="order-summary">
                    <a href="#address" className="order-summary-address">{t('Ваш заказ')}</a> 
                    <div className="order-summary-details">
                        <p className="order-summary-text">{t('Товары')}: {items.length} {t('шт.')}</p> 
                        <p className="order-summary-price">{total} $</p>
                    </div>
                    <div className="order-summary-discount">
                        <p className="order-summary-text">{t('Скидка')}:</p>
                        <p className="order-summary-discount-price">-{discount.toFixed(2)} $</p>
                    </div>
                    <div className="order-summary-total">
                        <p className="order-summary-total-text">{t('Итоговая сумма')}:</p> 
                        <p className="order-summary-final-price">{totalWithDiscount.toFixed(2)} $</p>
                    </div>
                    <button 
                        onClick={handleOrderClick} 
                        className="order-summary-btn" 
                        disabled={Object.values(errors).includes(true)}
                    >
                        {t('Оформить заказ')}
                    </button>
                    <label className="order-summary-agreement">
                        <input type="checkbox" /> {t('Я согласен с условиями')}
                    </label>
                </div>

                <div id="order-form">
                    <h2>{t('Оформление заказа')}</h2>
                    <div className="delivery-option">
                        <span>{t('Доставка курьером')}:</span> 
                        <span className="price">$ 50</span>
                    </div>
                    <div className="map-placeholder">
                        <iframe src="https://www.google.com/maps/embed?pb=..." width='100%' frameBorder="0"></iframe>
                    </div>
                    <div className="form-fields">
                        <div className="form-field">
                            <MdLocationOn />
                            <input
                                onChange={(e) => {
                                    setBasCity(e.target.value);
                                    validateFields();
                                }}
                                value={basCity}
                                type="text"
                                placeholder={t('Город')}
                                className={errors.basCity ? 'error' : ''}
                            />
                        </div>
                        {errors.basCity && <p className="error-message">{t('Пожалуйста, введите название города')}</p>}

                        <div className="form-field">
                            <HiOutlineUserCircle />
                            <input
                                onChange={(e) => {
                                    setBasLastName(e.target.value);
                                    validateFields();
                                }}
                                value={basLastName}
                                type="text"
                                placeholder={t('Фамилия')}
                                className={errors.basLastName ? 'error' : ''}
                            />
                        </div>
                        {errors.basLastName && <p className="error-message">{t('Это поле обязательно')}</p>}


                        <div className="form-field">
                            <HiOutlineUserCircle />
                            <input
                                onChange={(e) => {
                                    setBasName(e.target.value);
                                    validateFields();
                                }}
                                value={basName}
                                type="text"
                                placeholder={t('Имя')}
                                className={errors.basName ? 'error' : ''}
                            />
                        </div>
                        {errors.basName && <p className="error-message">{t('Это поле обязательно')}</p>}


                        <div className="form-field">
                            <MdOutlineEmail />
                            <input
                                onChange={(e) => {
                                    setBasEmail(e.target.value);
                                    validateFields();
                                }}
                                value={basEmail}
                                type="email"
                                placeholder={t('Email')}
                                className={errors.basEmail ? 'error' : ''}
                            />
                        </div>
                        {errors.basEmail && <p className="error-message">{t('Пожалуйста, введите правильный email')}</p>}


                        <div className="form-field">
                            <MdLocalPhone />
                            <input
                                onChange={(e) => {
                                    setBasNumber(e.target.value);
                                    validateFields();
                                }}
                                value={basNumber}
                                type="text"
                                placeholder={t('Телефон')}
                                className={errors.basNumber ? 'error' : ''}
                            />
                        </div>
                        {errors.basNumber && <p className="error-message">{t('Пожалуйста, введите правильный номер телефона')}</p>}

                    </div>
                    <button 
                        className="order-summary-btn"
                        disabled={Object.values(errors).includes(true)}
                        onClick={addTelegram}
                    >
                        {loading ? t('Загрузка...') : t('Подтвердить заказ')}
                    </button>
                </div>

              {orderSent && (
                    <div className="basket-modal">
                        {loading ? (
                            <div className="spinner"></div>
                        ) : orderSent ? (
                            <div className="basket-modal-success">
                                <h1 className='order-sentH1'>{t('Заказ отправлен.')}</h1> {/* Перевод: Заказ отправлен */}
                                <p className='order-sentP'>{t('Курьер выехал!')}</p> {/* Перевод: Курьер выехал! */}
                                <button className="basket-chekBtn"><AiOutlineCheck /></button>
                            </div>
                        ) : (
                            <>
                                <h1 className='basket-modalH1'>{t('Проверьте адрес доставки!')}</h1> {/* Перевод: Проверьте адрес доставки! */}
                                <p className='basket-modalP'>{basCity}?</p>
                                <button onClick={addTelegram} className='basket-modalBtn'>{t('Ок')}</button> {/* Перевод: Ок */}
                                <button onClick={() => setModalVisible(false)} className='basket-modalclose'>
                                    <IoIosCloseCircleOutline />
                                </button>
                            </>
                        )}
                        </div>
                   )}
            </div>
        </section>
    );
};

export default Basket;
