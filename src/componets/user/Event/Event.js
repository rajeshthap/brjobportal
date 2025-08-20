import React from 'react'
import Image1 from "../../../coming-soon.jpg";
import { Card } from 'react-bootstrap';
const Event = () => {
  return (
    <Card>
    <div className='comming-soon'>
      <img src={Image1} alt="Coming Soon"  />
    </div>
    </Card>
  )
}

export default Event 