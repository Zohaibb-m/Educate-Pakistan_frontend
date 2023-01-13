import React from "react-dom"
import { Link } from "react-router-dom";

function UserHome(setLogin){
    function logout(){
        localStorage.clear();
        setLogin(false);
      }
  return (
    <div>
    <h1>Logged in</h1>
    <Link onClick={logout} to="/">Log Out</Link>
    </div>
  );
}

export default UserHome;