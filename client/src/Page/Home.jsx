import React from 'react'
import Hero from '../components/Hero'
import HotelCard from '../components/HotelCard'
import FeatureHotel from '../components/FeatureHotel'
import ExclusiveOffer from '@/components/ExclusiveOffer'
import Testimonial from '@/components/Testimonial'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/Footer'

const Home = () => {
  return (
   <>
   <Hero />
   <FeatureHotel />
   <ExclusiveOffer />
   <Testimonial />
   <NewsLetter />

 
   </>
  )
}

export default Home