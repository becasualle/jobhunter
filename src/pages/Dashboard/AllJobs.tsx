import React from "react";
import { JobsContainer, SearchContainer } from "../../components";

type Props = {};

const AllJobs = (props: Props) => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
