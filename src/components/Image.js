import React from "react";

const Image = ({ data }) => <img alt='img' src={`data:image/jpeg;base64,${data}`} />

export default Image