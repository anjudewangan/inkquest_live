'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const AdsSlider = ({ images }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[400px] h-[300px]">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {images.map((item, index) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.imageUrl}
                alt={`Slide ${index}`}
                className="w-[400px] h-[300px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AdsSlider;
