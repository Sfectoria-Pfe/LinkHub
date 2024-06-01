import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import { ChatProps } from "./types";
import { chats } from "./data";

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = useState(chats[0]); // Removed unnecessary type annotation

  return (
    <Sheet
    
    >
   
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
}
