import React from "react";
import {Form, FormGroup} from "semantic-ui-react";
import axios from "axios";
import {HOST_URL} from "../settings";

const roles = [
  { key: '1', text: 'Пользователь', value: '1' },
  { key: '2', text: 'Модератор', value: '2' },
  { key: '3', text: 'Администратор', value: '3' },
  { key: '4', text: 'Стример', value: '4' },
  { key: '5', text: 'VIP', value: '5' },
]

const types = [
  { key: '1', text: 'Смайлик', value: 'smiley' },
  { key: '2', text: 'Иконка', value: 'icon' },
  { key: '3', text: 'Значок', value: 'badge' },
  { key: '4', text: 'Кастомный', value: 'custom' },
]

export class UploadImageForm extends React.Component {
  state = {
    type: "",
    role: "",
    description: "",
    base64image: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { type, role, description } = this.state;
    const base64image = this.props.image['data_url']

    axios.post(`${HOST_URL}/api/images/`, {
      image: base64image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      type: type,
      role: role,
      description: description
    })
      .then(() => this.props.onImageRemove())
      .catch(err => console.log("error " + err))

  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  render() {
    const { onImageUpdate, onImageRemove, image } = this.props;
    return (
      <Form>
        <FormGroup>
          <img src={image['data_url']} alt="" width="100" />
          <div className="image-item__btn-wrapper">
            <button onClick={() => onImageUpdate()}>Update</button>
            <button onClick={() => onImageRemove()}>Remove</button>
          </div>
          <Form.Select
            onChange={this.handleChange}
            name="type"
            fluid
            label='Type'
            options={types}
            placeholder='Type'
          />
          <Form.Select
            onChange={this.handleChange}
            name="role"
            fluid
            label='Role'
            options={roles}
            placeholder='Role'
          />
          <Form.Input
            onChange={this.handleChange}
            name="description"
            label='description'
            placeholder='description'
          />
          <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
        </FormGroup>
      </Form>
    );
  }
}
