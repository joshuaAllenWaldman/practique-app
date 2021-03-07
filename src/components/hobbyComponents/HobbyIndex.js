import React from 'react';



const HobbyIndex = (props) => {
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
      <div className="bg-white text-blue-400 border-2 border-black m-2 p-4 max-w-sm hover:bg-red-400" onClick={() => {props.updateCurrentHobby(hob)}} >
        <div className="flex flex-row justify-center w-64 h-16 items-center">
          <div>
            <h1 className="text-2xl"> {hob.name}</h1>
          </div>

        </div>

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