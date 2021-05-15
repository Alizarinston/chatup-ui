import React from 'react';
import { PhotoshopPicker } from 'react-color';


class ColorPicker extends React.Component {
  state = {
    background: this.props.color,
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      // <Popup
      //   trigger={<Button icon='pencil' />}
      //   content='Изменить цвет ника'
      //   inverted
      // />
      <PhotoshopPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete } />
    );
  }

}

export default ColorPicker