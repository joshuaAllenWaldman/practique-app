import React from 'react';



const HobbyIndex = (props) => {
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
        <div onClick={() => {props.updateCurrentHobby(hob)}} >
          <h1 >{index + 1}. {hob.name}</h1> <hr/>
        </div>

    )
  })
  return (
    <div>
      {hobbyCards}
    </div>
  )
}

export default HobbyIndex;