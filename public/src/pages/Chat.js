/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoutes } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          const user = JSON.parse(localStorage.getItem("chat-app-user"));
          setCurrentUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [navigate]);
  useEffect(() => {
    const fetchData = async () => {
      let isMounted = true;
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const response = await axios.get(
              `${allUserRoutes}/${currentUser._id}`
            );
            if (isMounted) {
              setContacts(response.data);
            }
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error(error);
      }
      return () => {
        isMounted = false;
      };
    };
    fetchData();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
