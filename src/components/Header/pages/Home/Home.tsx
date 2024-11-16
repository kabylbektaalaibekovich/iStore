import './Home.css';
import iphone from '../../../../assets/iphone.png';
import { useAppSelector } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { delTodo, getTodo, addItemToBasket, addFavorite, removeFavorite, setProd, setName, setCategory, setPrice, setCurrentTodoId, setDescreption } from '../../../../redux/Slices/TodoSlices';
import { TiDeleteOutline } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
import { BsCartCheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { BsBookmark } from "react-icons/bs"; 
import { BsCart2 } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import Footer from '../../../Footer/Footer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';  
import { useTranslation } from 'react-i18next'; 

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const todo: ITodo[] = useAppSelector((state) => state.Todo.todo);
  const favorites: ITodo[] = useAppSelector((state) => state.Todo.favorites);
  const items: ITodo[] = useAppSelector((state) => state.Todo.items); 
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

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

  const groupedTodos = todo.reduce<Record<string, ITodo[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section id="home">
      <div className="container">
        <div className="mainHome">
        <h1 className='homeH1'>{t('iPhone 13 Pro Max')} <br /><span className='homeP'>{t('AccessoriesFor')}</span></h1>
          <img className="home-img" src={iphone} alt="iPhone 13 Pro Max" />
        </div>

        {showAddedToCart && (
          <div className="added-to-cart-notification">
            {t('ProductAddedToCart')} 
          </div>
        )}

        {Object.keys(groupedTodos).map((category) => (
          <div key={category} className="category-block">
            <h2 className="category-title">{t(category)}</h2> 
            <div className="todo-cards">
              {groupedTodos[category].slice(0, 4).map((el) => (
                <div key={el._id} className="card">
                  <button className='delBtn' onClick={() => dispatch(delTodo(el._id))}>
                    <TiDeleteOutline />
                  </button>
                  <img className="card-img" src={el.prod} alt={el.name} />
                  <div className="priceName">
                    <Link to={`/product/${el._id}`}><h3 className='card-name'>{el.name}</h3></Link>
                  </div>
                  <div className="rating">
                    <span className="span-price">${' '} <CountUp start={0} end={el.price} duration={2.75} separator=" " /></span>

                    <div className="btns">
                      <button className='shopBtn' onClick={() => handleAddToBasket(el)}>
                        {items.some(basketItem => basketItem._id === el._id) ? <BsCartCheckFill /> : <BsCart2 />}
                      </button>
                      <button className="favorite" onClick={() => handleToggleFavorite(el)}>
                        {favorites.some(fav => fav._id === el._id) ? <BsBookmarkCheckFill /> : <BsBookmark />}
                      </button>
                      <button className='editBtn' onClick={() => {
                        dispatch(setProd(el.prod));
                        dispatch(setName(el.name));
                        dispatch(setCategory(el.category));
                        dispatch(setDescreption(el.descreption)); 
                        dispatch(setPrice(el.price));
                        dispatch(setCurrentTodoId(el._id.toString()));
                      }}>
                        <GrEdit />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default Home;
