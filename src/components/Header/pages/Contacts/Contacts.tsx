import React from 'react';
import { FaWhatsapp, FaVk, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import './Contacts.css';

const Contacts: React.FC = () => {
  return (
    <section id="contact">
      <div className="contact">
        <div className="contact__content">
          <h2 className="contact__title">Our office</h2>
          <div className="contact__map">
            <iframe
              title="Our Office Location"
              src="https://www.google.com/maps/embed?pb=..."
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="contact__address">
            <MdLocationOn className="icon-location" />
            <p className='contact__location'>Kurenkeeva 138, Bishkek, Kyrgyzstan.</p>
            <p className='contact__location'>2nd floor, 4nd audience </p>
          </div>
        </div>

        <div className="contact__phone">
          <FiPhone className="icon-phone" />
          <a className='contact__number' href="tel:+996552102179">+996 (552) 10-21-79</a>
        </div>

        <div className="contact__socials">
          <a href="#" className="social"><FaWhatsapp /></a>
          <a href="#" className="social"><FaVk /></a>
          <a href="#" className="social"><FaInstagram /></a>
          <a href="#" className="social"><FaTelegram /></a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
