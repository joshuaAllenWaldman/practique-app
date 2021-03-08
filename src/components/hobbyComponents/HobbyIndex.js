import React from 'react';



const HobbyIndex = (props) => {
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
      <div className="bg-white shadow-2xl border-2 border-black h-24 m-2 p-4 max-w-sm hover:bg-red-400 w-3/4 flex justify-center justify-items-center" onClick={() => {props.updateCurrentHobby(hob)}} >
        <div className="text-center flex justify-center">
          <div className="flex flex-nonwrap justify-center items-center">
            <h1 className="text-2xl text-center"> {hob.name}</h1>
          </div>

        </div>

      </div>

    )
  })
  return (
    <>
      {hobbyCards}
    </>
  )
}

export default HobbyIndex;