import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.css';
import { useAppSelector, useAppDispatch } from '../../../../redux/store';
import { addFavorite, addItemToBasket, getTodo, removeFavorite } from '../../../../redux/Slices/TodoSlices';
import { BsArrowRepeat, BsCart2, BsCartCheckFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoBackspace } from "react-icons/io5";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

import { FaTruckMoving } from 'react-icons/fa6';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const Detail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.Todo.todo);
  const items = useAppSelector((state) => state.Todo.items);
  const favorites = useAppSelector((state) => state.Todo.favorites);
  const product = todo.find((item) => item._id.toString() === id);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    if (todo.length === 0) {
      dispatch(getTodo());
    }
  }, [dispatch, todo.length]);

  const handleAddToBasket = (item: ITodo) => {
    if (!items.some(basketItem => basketItem._id === item._id)) {
      dispatch(addItemToBasket({ ...item }));
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    } else {
      navigate('/basket');
    }
  };

  const handleToggleFavorite = (item: ITodo) => {
    if (favorites.some(fav => fav._id === item._id)) {
      dispatch(removeFavorite(item._id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  if (!product) return <div className="error-message">{t('ProductNotFound')}</div>;

  return (
    <section className="detail">
      <div className="container">
        <button className="backBtn" onClick={() => navigate('/home')}><IoBackspace /> </button> 
        <div className="details">
          <div className="detail-card">
            <div className="product-thumbnails">
              {[product.prod, product.prod, product.prod].map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="thumbnail-image" />
              ))}
            </div>
            <div className="mainImg">
              <InnerImageZoom src={product.prod} alt={product.name} zoomScale={1} className="product-image-main" />
            </div>
          </div>

          <div className="detail-text">
            <h2 className="product-name">{product.name}</h2>
            <div className="product-rating">
              <span>★★★★★</span>
              <p>({t('ReviewsCount', { count: 150 })})</p> 
              <p className="in-stock">{t('InStock')}</p> 
            </div>
            <p className="product-price">${' '} <CountUp start={0} end={product.price} duration={2.75} separator=" " /></p>
            <p className="product-description">{product.descreption}</p>

            <div className="product-options">
              <div className="quantity-selector">
                <button onClick={() => handleAddToBasket(product)} className="add-to-cart-btn">
                  {items.some(basketItem => basketItem._id === product._id) ? (
                    <>
                      <BsCartCheckFill /> {t('GoToCart')}
                    </>
                  ) : (
                    <>
                      <BsCart2 /> {t('BuyNow')}
                    </>
                  )}
                </button>
                <button onClick={() => handleToggleFavorite(product)} className="add-to-favorites-btn">
                  {favorites.some(fav => fav._id === product._id) ? <BsHeartFill /> : <BsHeart />} 
                </button>
              </div>
            </div>

            <div className="delivery-info">
              <div className="free-delivery">
                <FaTruckMoving size={22} />
                <p>{t('FreeDelivery')}</p>
                <span>{t('EnterPostalCodeForDelivery')}</span>
              </div>
              <div className="return-delivery">
                <BsArrowRepeat size={22} />
                <p>{t('ReturnDelivery')}</p>
                <span>{t('Free30DaysReturns')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddedToCart && (
          <div className="added-to-cart-notification">
            {t('ProductAddedToCart')}
          </div>
        )}
    </section>
  );
};

export default Detail;
