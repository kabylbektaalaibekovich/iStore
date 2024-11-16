import { useAppSelector, useAppDispatch } from '../../../../redux/store'; // Проверьте путь к store
import { addItemToBasket, removeFavorite } from '../../../../redux/Slices/TodoSlices'; // Убедитесь, что этот импорт верный
import './favorite.css';
import { useNavigate } from 'react-router';
import Footer from '../../../Footer/Footer';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { BsCart2, BsCartCheckFill } from 'react-icons/bs';

const Favorite = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const todo: ITodo[] = useAppSelector((state) => state.Todo.todo);
    const favorites = useAppSelector((state) => state.Todo.favorites);
    const items = useAppSelector((state) => state.Todo.items);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const handleRemoveFavorite = (id: string) => {
        dispatch(removeFavorite(id));
    };
    const handleAddToBasket = (item: ITodo) => {
        if (!items.some(basketItem => basketItem._id === item._id)) {
          dispatch(addItemToBasket({ ...item }));
          setShowAddedToCart(true);
          setTimeout(() => setShowAddedToCart(false), 2000);
        } else {
          navigate('/basket');
        }
      };
    
    return (
       <section className="favorite">
        <div className="container">
        {showAddedToCart && (
          <div className="added-to-cart-notification">
            Product Added To Cart !
          </div>
        )}
            <div className="favoriteCard">
            <div className="favorites-container">
            <h2 className="favorites-title">Wishlist product</h2>
            {favorites.length === 0 ? (
                  <div className="basketEmpty">
                  <img className='basketEmtyImg' src='https://www.freeiconspng.com/thumbs/favorites-icon-png/favorites-love-plus-icon-png-7.png' alt="" />
                  <h1 className='basketEmptyH1'> Oops you don't have any favorites</h1>
                  <p className='basketEmptyp'>But it's never too late to fix it :)</p>
                  <button className='basketEmptypBtn' onClick={() => navigate('/home')}>To product catalog</button>
                 </div>
            ) : (
                <ul className="favorites-list">
                    {favorites.map((item) => (
                      <div className="mainLI">
                          <li key={item._id} className="favorite-item">
                            <img className="favorite-image" src={item.prod} alt={item.name} />
                            <button className="remove-favorite-btn" onClick={() => handleRemoveFavorite(item._id)}>
                            <MdDelete />
                            </button>

                              <button onClick={() => handleAddToBasket(item)} className="addToBasket">
                  {items.some(basketItem => basketItem._id === item._id) ? (
                    <>
                      <BsCartCheckFill />Go To Cart
                    </>
                  ) : (
                    <>
                      <BsCart2 /> Buy Now
                    </>
                  )}
                </button>

                        </li>
                        <div className="name-price">
                        <h3 className="favorite-name">{item.name}</h3>
                        <span className="favorite-price">${item.price}</span>
                            </div> 
                      </div>
                        
                    ))}
                    
                </ul>
            )}
            <div className="forYou">
              <h1 className='forYou-title'>Just for you !</h1>
              <ul className="favorites-list">
                    {todo.slice(5,9).map((item) => (
                      <div className="mainLI">
                          <li key={item._id} className="favorite-item">
                            <img className="favorite-image" src={item.prod} alt={item.name} />
                              <button onClick={() => handleAddToBasket(item)} className="addToBasket">
                  {items.some(basketItem => basketItem._id === item._id) ? (
                    <>
                      <BsCartCheckFill />Go To Cart
                    </>
                  ) : (
                    <>
                      <BsCart2 /> Buy Now
                    </>
                  )}
                </button>

                        </li>
                        <div className="name-price">
                        <h3 className="favorite-name">{item.name}</h3>
                        <span className="favorite-price">${item.price}</span>
                            </div> 
                      </div>
                        
                    ))}
                    
                </ul>
            </div>
        </div>
            </div>
        </div>
       <Footer/>

       </section>
    );
};

export default Favorite;
