import React from 'react';
import { Link } from 'react-router-dom';

const HobbyIndex = (props) => {

  
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
      <Link to={`/hobbies/${hob._id}`} >
        <div>
          <h1>{index + 1}. {hob.name}</h1> <hr/>
        </div>
      </Link>
    )
  })
  return (
    <div>
      {hobbyCards}
    </div>
  )
}

export default HobbyIndex;