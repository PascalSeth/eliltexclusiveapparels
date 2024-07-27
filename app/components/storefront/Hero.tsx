'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

async function fetchBannerData() {
  const response = await fetch('/api/banner');
  if (!response.ok) {
    throw new Error('Failed to fetch banners');
  }
  return response.json();
}

export function Hero() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBannerData()
      .then((data) => {
        setBanners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); // Log error details
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    appendDots: (dots: React.ReactNode[]) => (
      <div style={{ position: 'absolute', bottom: 10, width: '100%' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  if (loading) {
    return (
      <div className="flex overflow-hidden">
        {[...Array(1)].map((_, index) => (
          <div key={index} className="flex-1 w-full">
            <div className="bg-gray-200 h-[50vh] lg:h-[80vh] rounded-xl animate-pulse"></div>
            <div className="w-full h-6 mt-2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <Slider {...settings} className='max-w-6xl mx-auto overflow-hidden'>
      {banners.map((item) => (
        <div key={item.id} className="relative h-[40vh] lg:h-[70vh]">
          <Image
            alt="Banner Image"
            src={item.imageString}
            fill
            className="object-cover w-full h-full rounded-xl"
          />
          <div className="absolute bottom-5 right-6 bg-opacity-75 text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
            <h1 className="text-xl lg:text-4xl font-bold">{item.title}</h1>
          </div>
        </div>
      ))}
    </Slider>
  );
}