import {ChatLine} from '../containers/ChatLine';
import React, { useEffect, useRef } from 'react'

export const ChatContent = ({ chatLines, smiles }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chatLines]);

  const chatContentStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    overflowY: "scroll",
    overflowX: "hidden",
    borderRight: "1px solid #DAD8DE",
  }

  return (
    <div style={chatContentStyle}>
      {chatLines.map(cl =>
        <ChatLine messageObject={cl} key={cl.id} smiles={smiles} test={scrollToBottom}/>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}