 import { useContext } from "react";
 import { UserContext } from "../contexts/UserContext";
// import axios from "axios";

const Home = () => {
  const {userState} = useContext(UserContext)
  //const {verifiedToken, user} = userState
  //console.log(UserContext)
  return (
    <> 
      <header>Home</header>
      <p>verifiedToken: {JSON.stringify(userState.verifiedToken)}</p>
      <p>user: {JSON.stringify(userState.user)}</p>
     

    </>
   );
}
 
export default Home;