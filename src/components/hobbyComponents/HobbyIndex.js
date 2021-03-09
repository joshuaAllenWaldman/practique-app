import React from "react";
import { Link } from 'react-router-dom'

const HobbyIndex = (props) => {

  
  const hobbyCards = props.hobbies.map((hob, index) => {
    return (
      <div
        key={hob._id}
        className="bg-lightPink shadow-2xl border-2 border-darkBlue h-24 my-4 p-4 max-w-sm hover:bg-lightBlue w-3/4 flex justify-center justify-items-center transform transition rounded hover:scale-110 overflow-hidden"
        onClick={() => {
          props.updateCurrentHobby(hob);
        }}
        onDoubleClick={() => props.history.push(`/hobbies/${hob._id}`)}
      >
        <div className="text-center flex justify-center">
          <div className="flex flex-nonwrap justify-center items-center">
            <h1 className="text-2xl text-darkBlue text-center"> {hob.name}</h1>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      {props.hobbies.length > 0 && <>{hobbyCards}</> }
      {!props.hobbies.length > 0 && <div className="bg-lightPink shadow-2xl border-2 border-darkBlue h-24 my-4 p-4 max-w-sm w-3/4 flex justify-center justify-items-center ">
      <div className="text-center flex justify-center my-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl text-darkBlue text-center mt-4"> You haven't added a hobby yet! </h1>
            <div className="bg-darkBlue text-lightPink hover:bg-lightBlue px-4 py-2 rounded transform transition rounded hover:scale-110 my-4">
              <Link to={"/add-hobby"} >Add Your First Hobby!</Link>  
            </div>
          </div>
        </div>
      </div>}


    </>
    )
};

export default HobbyIndex;
