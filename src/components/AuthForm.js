import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import Signup from "../containers/Signup";
import Login from "../containers/Login";

function AuthForm () {
  const [auth, setAuth] = useState(false)
  const [delay, setDelay] = useState(false)

  function changeAuth () {
    setDelay(prev => !prev)
    setTimeout(() => {
      setAuth(prev => !prev)
      setDelay(prev => !prev)
    }, 500)

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
          <Signup changeAuth = {changeAuth} delay={delay} /> :
          <Login changeAuth = {changeAuth} delay={delay} />
        }
      </div>
    </>
  )
}

export default AuthForm