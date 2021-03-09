import { Link } from 'react-router-dom'


const LandingPage = (props) => {
  return (
    <div className="flex flex-col justify-start items-center bg-darkBlue my-8 mx-32 opacity-90 rounded-xl">
      <div className="title text-8xl underline my-4 text-lightPink  py-4 text-center shadow-8xl rounded">
        <h1 style={{fontFamily: "Karla"}}>Welcome to Practíque</h1>
      </div>

      <div className="landingImageDiv border-2 border-lightPink rounded-full w-4/6 overflow-hidden">
        <img src="https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://cf-images.us-east-1.prod.boltdns.net/v1/static/5985631785001/17e64f49-51cf-48b3-ac4b-4ec68d61526b/a8286f45-8f18-4bbd-945d-054c6da8b964/1280x720/match/image.jpg&w=1280&h=720&q=90&c=cc" alt=""/>
      </div>

      <article className="text-2xl my-4 text-lightPink w-3/4 text-center">
        <p>
          Join a single-digit number of users in sharpening your skills at your favorite hobby by logging practice sessions. 
        </p>
        <div className="my-4 text-center">
          {!props.isLoggedIn && <Link to="/signup" className="transform transition hover:scale-110 mx-1"><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >SignUp</span></Link>}
          {!props.isLoggedIn && <span>or </span>}
          {!props.isLoggedIn && <Link to="/login" className="transform transition hover:scale-110 mx-1"><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >Login</span></Link>}
        

        </div>
      </article>
    </div>
  );
};

export default LandingPage;
