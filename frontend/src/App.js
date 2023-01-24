import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "935332498387-3esk9mek4urtfr27849s97ekvqk6haro.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    
    google.accounts.id.prompt();
  }, []);
  // 유저 없을 때 : signin 버튼
  // 유저 있을 때 : logout 버튼
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={(event) => handleSignOut(event)}>SignOut</button>
      }
      { user &&
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>
      }
    </div>
  );
}

export default App;
