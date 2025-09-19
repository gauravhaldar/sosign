'use client';

import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import CurrentPetitions from "@/components/CurrentPetitions";
import Achievements from "@/components/Achievements";
import Slider from "@/components/Slider";
import Video from "@/components/Video";
import FeaturedTopic from "@/components/FeaturedTopic";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Banner />
      <Testimonials />
      <CurrentPetitions />
      <Achievements />
      <Slider />
      <Video />
      <FeaturedTopic />
      <Footer />
    </>
  );
}
