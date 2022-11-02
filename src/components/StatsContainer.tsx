import React, { ReactElement } from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { StatItem } from "../components";
import styled from "styled-components";

export interface DefaultStats {
  title: string;
  count: number;
  icon: ReactElement;
  color: string;
  bcg: string;
}

const StatsContainer = () => {
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats: DefaultStats[] = [
    {
      title: "pending applications",
      count: stats.pending,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;
