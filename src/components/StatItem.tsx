import React from "react";
import { DefaultStats } from "./StatsContainer";
import styled from "styled-components";

const StatItem = ({ bcg, color, count, icon, title }: DefaultStats) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="icon">{count}</span>
        <span className="count">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

interface StyledProps {
  bcg: string;
}

const Wrapper = styled.article<StyledProps>`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

export default StatItem;
