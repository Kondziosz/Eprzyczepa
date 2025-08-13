import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Karty.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import img1_wilk from '../images/1wilk/img1.jpeg';
import img2_wilk from '../images/1wilk/img2.jpeg';
import img3_wilk from '../images/1wilk/img3.jpeg';
import img4_wilk from '../images/1wilk/img4.jpeg';
import img5_wilk from '../images/1wilk/img5.jpeg';
import img6_wilk from '../images/1wilk/img6.jpeg';
import img7_wilk from '../images/1wilk/img7.jpeg';
import img8_wilk from '../images/1wilk/img8.jpeg';
import img9_wilk from '../images/1wilk/img9.jpeg';
import img10_wilk from '../images/1wilk/img10.jpeg';
import img11_wilk from '../images/1wilk/img11.jpeg';
import img12_wilk from '../images/1wilk/img12.jpeg';
import img13_wilk from '../images/1wilk/img13.jpeg';
import img14_wilk from '../images/1wilk/img14.jpg';

import img1_adria from '../images/2adria/img1.JPG';
import img2_adria from '../images/2adria/img2.JPG';
import img3_adria from '../images/2adria/img3.JPG';
import img4_adria from '../images/2adria/img4.jpg';
import img5_adria from '../images/2adria/img5.JPG';
import img6_adria from '../images/2adria/img6.jpg';
import img7_adria from '../images/2adria/img7.JPG';
import img8_adria from '../images/2adria/img8.JPG';
import img9_adria from '../images/2adria/img9.JPG';
import img10_adria from '../images/2adria/img10.JPG';
import img11_adria from '../images/2adria/img11.JPG';
import img12_adria from '../images/2adria/img12.jpg';

import img1_tabbert from '../images/3tabbert/img1.JPG';
import img2_tabbert from '../images/3tabbert/img2.JPG';
import img3_tabbert from '../images/3tabbert/img3.JPG';
import img4_tabbert from '../images/3tabbert/img4.JPG';
import img5_tabbert from '../images/3tabbert/img5.JPG';
import img6_tabbert from '../images/3tabbert/img6.JPG';
import img7_tabbert from '../images/3tabbert/img7.JPG';
import img8_tabbert from '../images/3tabbert/img8.JPG';
import img9_tabbert from '../images/3tabbert/img9.JPG';
import img10_tabbert from '../images/3tabbert/img10.JPG';
import img11_tabbert from '../images/3tabbert/img11.JPG';
import img12_tabbert from '../images/3tabbert/img12.JPG';
import img13_tabbert from '../images/3tabbert/img13.JPG';
import img14_tabbert from '../images/3tabbert/img14.JPG';

import img1_hobby from '../images/4hobby/img1.jpeg';
import img2_hobby from '../images/4hobby/img2.jpeg';
import img3_hobby from '../images/4hobby/img3.jpeg';
import img4_hobby from '../images/4hobby/img4.jpeg';
import img5_hobby from '../images/4hobby/img5.jpeg';
import img6_hobby from '../images/4hobby/img6.jpeg';
import img7_hobby from '../images/4hobby/img7.jpeg';
import img8_hobby from '../images/4hobby/img8.jpeg';
import img9_hobby from '../images/4hobby/img9.jpeg';
import img10_hobby from '../images/4hobby/img10.jpeg';


function Karty()
{
  const swiperRefs = useRef([]);

  const wilkImages = [img1_wilk, img2_wilk, img3_wilk, img4_wilk, img5_wilk, img6_wilk, img7_wilk, img8_wilk, img9_wilk, img10_wilk, img11_wilk, img12_wilk, img13_wilk, img14_wilk];
  const adriaImages = [img1_adria, img2_adria, img3_adria, img4_adria, img5_adria, img6_adria, img7_adria, img8_adria, img9_adria, img10_adria, img11_adria, img12_adria];
  const tabbertImages = [img1_tabbert, img2_tabbert, img3_tabbert, img4_tabbert, img5_tabbert, img6_tabbert, img7_tabbert, img8_tabbert, img9_tabbert, img10_tabbert, img11_tabbert, img12_tabbert, img13_tabbert, img14_tabbert];
  const hobbyImages = [img1_hobby, img2_hobby, img3_hobby, img4_hobby, img5_hobby, img6_hobby, img7_hobby, img8_hobby, img9_hobby, img10_hobby];


  const campers = [
    { id: 1, name: "Przyczepa Wilk", images: wilkImages },
    { id: 2, name: "Przyczepa Adria", images: adriaImages },
    { id: 3, name: "Przyczepa Tabbert", images: tabbertImages },
    { id: 4, name: "Przyczepa Hobby", images: hobbyImages },
  ];

  return (
    <div className='karty' id='karty'>
      <div className='container'>
        <div className='card-container'>
          {campers.map((camper, idx) => (
            <div key={camper.id} className='card'>
              <h3 className='card-header'>{camper.name}</h3>
              <Swiper
                className='swiper'
                modules={[Navigation, Pagination]}
                navigation
                pagination
                onSwiper={(swiper) => swiperRefs.current[idx] = swiper}
              >
                {camper.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={camper.name} className='card-image' />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="navigation-container ">
                <div className="arrow arrow-left flex items-center translate-y-[-4px] lg:translate-y-0 lg:scale-x-250 lg:ml-8" onClick={() => swiperRefs.current[idx]?.slidePrev()}></div>
                <button className='bg-[#ff66009a] rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.25),-12px_-12px_24px_rgba(255,255,255,0.6)] px-2 lg:px-8 lg:py-3 text-center font-body leading-[0.88] text-white text-lg font-semibold textborder text-[14px] lg:text-[30px]'>Sprawdź Dostępność</button>
                <div className="arrow arrow-right  flex items-center translate-y-[-4px] lg:translate-y-0 lg:scale-x-250 lg:mr-8" onClick={() => swiperRefs.current[idx]?.slideNext()}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Karty;
