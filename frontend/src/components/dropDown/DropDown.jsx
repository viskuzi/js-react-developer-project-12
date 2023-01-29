import React from "react";
import styled from 'styled-components';
import { useState } from "react";

const DropDownContainer = styled("div")`
  width: 6.5em;
  margin: 0 auto;
`;

const DropDownListContainer = styled("div")``;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.2em;
  background-color: ##c000ff;
`;

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <div>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}></DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {/* <ListItem></ListItem> */}
              <ListItem>Delete</ListItem>
              <ListItem>Rename</ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </div>
  );
};
