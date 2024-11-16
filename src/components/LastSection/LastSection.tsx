import './LastSection.css';
import { MdOutlineSmartphone } from "react-icons/md";
import { VscArchive, VscCheck } from "react-icons/vsc";
import { useTranslation } from 'react-i18next'; 
import HeroSwiper from '../HeroSwiper/HeroSwiper';

const LastSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('ActualStock'),
      description: t('ActualStockDesc'),
      icon: <MdOutlineSmartphone />, 
    },
    {
      title: t('WideAssortment'), 
      description: t('WideAssortmentDesc'), 
      icon: <VscArchive />,
    },
    {
      title: t('HonestWarranty'),
      description: t('HonestWarrantyDesc'), 
      color: 'gray',
      icon: <VscCheck />, 
    },
  ];

  return (
    <section className='last-section'>
      <div className="container">
        <div className="last-content">
          <div className="features-container">
            <h2 className='text-3xl text-gray-900 text-left p-7'>{t('OurAdvantages')}</h2> {/* Translated title */}
            <div className="features">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="icon">{feature.icon}</div>
                  <h3 className='text-2xl text-gray-900'>{feature.title}</h3>
                  <p className='text-xl text-gray-900'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <HeroSwiper />
    </section>
  );
};

export default LastSection;
