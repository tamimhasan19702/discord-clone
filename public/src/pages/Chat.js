/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoutes } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/");
        } else {
          const user = JSON.parse(localStorage.getItem("chat-app-user"));
          setCurrentUser(user);
          if (user && user.isAvatarImageSet) {
            const response = await axios.get(`${allUserRoutes}/${user._id}`);
            setContacts(response.data);
          } else {
            navigate("/setavatar");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
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
