import React from 'react';

import {EmoteBox} from '../components/EmoteBox';
import {TextAreaBox} from '../components/TextAreaBox';


export class EmotePickerBox extends React.Component {
  state = {
    smilesFilter: "",
    filteredSmiles: this.props.smiles,
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.smilesFilter !== this.state.smilesFilter ||
      newProps.display !== this.props.display;
  }

  handleFilterChange = (e) => {
    this.setState({
      smilesFilter: e.target.value,
      filteredSmiles: this.props.smiles.filter(t => t.label.toLowerCase().includes(e.target.value.toLowerCase())),
    });
  }

  render() {
    const emotePickerBoxWrapperStyle = {
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      bottom: 120,
      width: 300,
      border: "1px solid #DAD8DE",
      boxShadow: "0 2px 4px -1px rgba(0,0,0,.1)",
      display: "flex",
      flexDirection: "column",
    }

    const emotePickerBoxStyle = {
      display: "flex",
      maxHeight: 305,
      overflowY: "scroll",
      overflowX: "hidden",
      background: "white",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "20px",
      boxSizing: "border-box",
    }

    const smileFinderBox = {
      display: "flex",
      flexShrink: 0,
      background: "white",
      borderTop: "1px solid #DAD8DE",
      flexBasis: 50,
      padding: 10,
      boxSizing: "border-box",
    }

    // const emoteBoxes = this.state.filteredSmiles.map((emoteBox) => (
    const emoteBoxes = this.props.smiles.map((emoteBox) => (
      <EmoteBox
        fileName={emoteBox.image}
        label={emoteBox.description}
        onEmoteClick={this.props.onEmoteClick}
        id={emoteBox.id}
        key={emoteBox.id}
      />
    ))

    return (
      <div style={emotePickerBoxWrapperStyle}>
        <div style={emotePickerBoxStyle}>
          {emoteBoxes}
        </div>
        <div style={smileFinderBox}>
          <TextAreaBox
            onChange={this.handleFilterChange}
            value={this.state.smilesFilter}
            placeholder="Search for Emotes"
            style={{ height: 30 }}
          />
        </div>
      </div>
    );
  }
}