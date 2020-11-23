import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"

function CardProfile (props) {

  return (
    <Card>
      <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.username}</Card.Header>

        <Card.Meta>
          <span className='date'>Joined in 2015</span>
        </Card.Meta>

        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Icon as={'a'} name='user' />
        22 Friends
      </Card.Content>
    </Card>
  )
}

export default CardProfile