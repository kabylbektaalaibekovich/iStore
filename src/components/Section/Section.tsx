import './Section.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import LastSection from '../LastSection/LastSection';
import { useTranslation } from 'react-i18next';

const Section = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className='section'>
            <div className="container">
                <div className="section">
                    <div className="section-card">
                        <h1 className='cardH1'>{t('iPhone16Pro')}</h1>
                        <p className='cardP'>{t('AppleCasesDescription')}</p>
                        <Button 
                            onClick={() => navigate('/home')} 
                            className='cardBtn' 
                            variant="outlined"
                        >
                            {t('BuyNow')}
                        </Button>
                    </div>
                </div>
            </div>
            <LastSection />
        </section>
    );
};

export default Section;
