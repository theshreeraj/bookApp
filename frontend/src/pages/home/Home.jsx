import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import FeaturedBooks from "../../components/featuredBooks/FeaturedBooks";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedBooks />
      <Footer />
    </div>
  );
};

export default Home;
