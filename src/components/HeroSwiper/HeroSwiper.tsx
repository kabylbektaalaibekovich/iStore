import './HeroSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useAppSelector } from '../../redux/store';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addFavorite, addItemToBasket, removeFavorite } from '../../redux/Slices/TodoSlices';
import { BsBookmark, BsCart2, BsCartCheckFill, BsFillBookmarkFill } from "react-icons/bs"; 
import { useEffect, useState } from 'react';
import { getTodo } from '../../redux/Slices/TodoSlices';
import LowerSection from '../LowerSection/LowerSection';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const HeroSwiper = () => {
    const { t } = useTranslation(); // Initialize translation
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites: ITodo[] = useAppSelector((state) => state.Todo.favorites);
    const todo: ITodo[] = useAppSelector((state) => state.Todo.todo);
    const [showAddedToCart ,  setShowAddedToCart] = useState(false);
    const items: ITodo[] = useAppSelector((state) => state.Todo.items); // Используем `items` как корзину

    const handleAddToBasket = (item: ITodo) => {
      const isInBasket = items.some((basketItem) => basketItem._id === item._id);
  
      if (isInBasket) {
        navigate('/basket');
      } else {
        dispatch(addItemToBasket(item));
        setShowAddedToCart(true);
  
        setTimeout(() => {
          setShowAddedToCart(false);
        }, 2000);
      }
    };

    const handleToggleFavorite = (item: ITodo) => {
        if (favorites.some(fav => fav._id === item._id)) {
          dispatch(removeFavorite(item._id));
        } else {
          dispatch(addFavorite(item));
        }
    };

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch]);

    if (todo.length === 0) {
        return <div>{t('Loading')}</div>;
    }

    return (
        <section className='heroSwiper'>
            <div className="container">
            {showAddedToCart && (
          <div className="added-to-cart-notification">
            {t('ProductAddedToCart')} 
          </div>
        )}
                <div className="hero-swiper">
                    <h1 className='my-[40px] text-3xl'>{t('Recommended')}</h1> 
                    <Swiper
                        modules={[Navigation]} 
                        spaceBetween={10} 
                        slidesPerView={3} 
                        navigation={true} 
                        pagination={{ clickable: true }} 
                        loop={true} 
                        speed={500} 
                        effect="slide" 
                        breakpoints={{
                          0: {         
                              slidesPerView: 1,
                          },
                          768: {       
                              slidesPerView: 2,
                          },
                          1024: {
                              slidesPerView: 3,
                          },
                      }}
                    >
                        {todo.map((item) => (
                            <SwiperSlide key={item._id}>
                                <div className="product-item">
                                    <img src={item.prod} alt={item.name} className="product-image" />
                                    <Link to={`/product/${item._id}`}><h3>{item.name}</h3></Link>  
                                    <tr>____________________________________________</tr>
                                    <p>{t('Price')}: $ {item.price}</p>
                                    <div className="productBtns">
                                      <button className='text-3xl text-gray-900' onClick={() => handleAddToBasket(item)}>
                                        {items.some(basketItem => basketItem._id === item._id) ? <BsCartCheckFill /> : <BsCart2 />}
                                      </button>
                                      <button className="text-gray-900 text-2xl" onClick={() => handleToggleFavorite(item)}>
                                        {favorites.some(fav => fav._id === item._id) ? <BsFillBookmarkFill /> : <BsBookmark />}
                                      </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <LowerSection />
        </section>
    );
};
export default HeroSwiper;
