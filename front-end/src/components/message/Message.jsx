import React from 'react';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';

export default function Message({ msg }) {
  return msg.from_user ? (
    <UserMessage msg={msg} />
  ) : (
    <BotMessage msg={msg} />
  );
}
