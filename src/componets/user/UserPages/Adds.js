import React from "react";
import "../../../assets/css/AdBanner.css";
import Addss from "../../../assets/images/img-adds.jpg";
import Addss1 from "../../../assets/images/img-add1.webp";
import Addss2 from "../../../assets/images/img-add2.jpg";
import Addss3 from "../../../assets/images/img-add3.jpg";

const Adds = () => {
  return (
    <div className="ad-banner">
      <div className="ad-label">Adds</div>
      <img src={Addss} alt="Ad Banner" className="ad-image" />
      <div className="ad-label">Adds</div>
      <img src={Addss1} alt="Ad Banner" className="ad-image" />
      <div className="ad-label">Adds</div>
      <img src={Addss2} alt="Ad Banner" className="ad-image" />
       <div className="ad-label">Adds</div>
      <img src={Addss3} alt="Ad Banner" className="ad-image" />
    </div>
    
    
  );
};

export default Adds;
