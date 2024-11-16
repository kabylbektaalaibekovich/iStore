import React from 'react';
import './LowerSection.css';
import { useAppSelector } from '../../redux/store';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const LowerSection: React.FC = () => {
    const { t } = useTranslation(); // Initialize translation
    const todo: ITodo[] = useAppSelector((state) => state.Todo.todo);

  return (
   <section className='lower-section'>
    <div className="container">
        <div className="lower-content">
        <h1 className='text-3xl p-5'>{t('TopRated')}</h1> 
        <div className="product-grid">
      {todo.slice(8,14).map((item) => (
        <div key={item._id} className="product-card">
          <h2 className="product-name">{item.name}</h2>
          <p className="product-description">{item.category}</p>
          <img src={item.prod} alt={item.name} className="product-image" />
         <Link to={`/product/${item._id}`}> <a className="select-link">{t('GoFor')} &gt;</a></Link> 
        </div>
      ))}
    </div>
        </div>
    </div>
    <Footer/>
   </section>
  );
};

export default LowerSection;
