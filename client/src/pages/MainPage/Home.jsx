import React, { useState } from "react";
import InfoSection from "../../components/infoSection/infoSection";
import MainSection from "../../components/MainSection/mainSection";
import Navbar from "../../components/Navbar/navbar";
import Services from "../../components/Servicef/Services";
import { homeObjOne, homeObjTwo } from "../../components/infoSection/data";
import Sidebar from "../../components/SideBar/Sidebar";
import Footer from "../../components/Footer/footer";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <MainSection></MainSection>
      <InfoSection {...homeObjOne}></InfoSection>
      <InfoSection {...homeObjTwo}></InfoSection>
      <Services></Services>
      <Footer></Footer>
    </>
  );
}

export default Home;
