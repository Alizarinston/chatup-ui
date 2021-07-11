import React from "react";
import { Image as SemanticImage } from "semantic-ui-react";

const Image = ({ data }) => <img alt='img' src={`data:image/jpeg;base64,${data}`} />
export const ChatImage = ({ data }) => <SemanticImage wrapped className={'message-img'} alt='img' src={`data:image/jpeg;base64,${data}`} />

export default Image