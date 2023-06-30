import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { StyledApp } from './styled';

const {
  Container,
  Form,
  HistoryWrapper,
  NoHistory,
  ChatItem,
  ChatName,
  ChatMessage,
  NameInput,
  MessageInput,
  SubmitButton,
} = StyledApp;

/** @type {Socket} */
const socket = new io('http://localhost:3000/');

const App = () => {
  const [messageHistory, setMessageHistory] = useState([]);

  const uid = useRef(null);
  const historyElement = useRef(null);

  const [userMessage, setUserMessage] = useState({
    name: '김주현',
    message: '',
  });

  useEffect(() => {
    const onConnect = () => {
      uid.current = socket.id;
    };

    const onMessage = (data) => {
      console.log(`${data.id}가 보냈다잉: `, data);

      setMessageHistory((prevHistory) => [...prevHistory, { id: uid.current, ...data }]);
    };

    const onUserEnter = (userId) => {
      console.log(`${userId}가 들어왔다잉`);
    };

    const onUserLeave = (userId) => {
      console.log(`${userId}가 떠났다잉ㅠ`);
    };

    socket.on('connect', onConnect);
    socket.on('Message', onMessage);
    socket.on('USER_ENTER', onUserEnter);
    socket.on('USER_LEAVE', onUserLeave);
  }, []);

  useEffect(() => {
    historyElement.current.scrollTop = historyElement.current.scrollHeight;
  }, [messageHistory]);

  const handleChange = (e) => {
    setUserMessage((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageToSend = { id: uid.current, ...userMessage };

    socket.emit('Message', messageToSend);

    setMessageHistory((prevHistory) => [...prevHistory, messageToSend]);

    setUserMessage((prevUser) => ({
      ...prevUser,
      message: '',
    }));
  };

  return (
    <Container>
      <HistoryWrapper ref={historyElement}>
        {messageHistory.length === 0 ? (
          <NoHistory>첫 메시지를 남겨보세요🥳</NoHistory>
        ) : (
          messageHistory.map(({ id, name, message }, index) => (
            <ChatItem key={index} me={id === socket.id}>
              <ChatName>{name}</ChatName>
              <ChatMessage>{message}</ChatMessage>
            </ChatItem>
          ))
        )}
      </HistoryWrapper>
      <Form onSubmit={handleSubmit}>
        <NameInput
          id="name"
          value={userMessage.name}
          onChange={handleChange}
          placeholder="닉네임"
        />
        <MessageInput
          id="message"
          value={userMessage.message}
          onChange={handleChange}
          placeholder="메시지를 입력하세요..."
        />
        <SubmitButton>보내기</SubmitButton>
      </Form>
    </Container>
  );
};

export default App;
