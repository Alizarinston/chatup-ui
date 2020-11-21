import React, {useState} from "react"
import {Button, Icon, Menu} from "semantic-ui-react"
import Signup from "../containers/Signup";
import Login from "../containers/Login";

function AuthForm () {
  const [auth, setAuth] = useState(false)

  function changeAuth () {
    setAuth(prev => !prev)
  }

  return (
    <>
      <div className="chatHeader">
        <Menu>
          <Menu.Item>
            <Icon name={"vk"}/>
          </Menu.Item>

          <Menu.Item>
            <Icon name={"google"}/>
          </Menu.Item>
        </Menu>
      </div>

      <div className="messages">
        { Array.from({ length: 10 }, (_, i) => <br key={i}/>) }
        { (auth) ?
          <Signup loginButton = {
            <Button compact icon color={"google plus"} content={'Login'} onClick={changeAuth} />
          } /> :
          <Login signupButton = {
            <Button compact icon color={"google plus"} content={'Sign Up'} onClick={changeAuth}/>
          } />
        }
      </div>
    </>
  )
}

export default AuthForm