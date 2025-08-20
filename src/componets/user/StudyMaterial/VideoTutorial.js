import React from 'react'
import Image1 from "../../../coming-soon.jpg";
import "../../../assets/css/Training.css";
import { Card } from 'react-bootstrap';
const VideoTutorial = () => {
  return (
    <Card>
    <div className='comming-soon'>
      <img src={Image1} alt="Coming Soon"/>
    </div>
    </Card>
  )
}

export default VideoTutorial