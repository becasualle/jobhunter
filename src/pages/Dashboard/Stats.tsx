import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { StatsContainer, ChartsContainer, Loading } from "../../components";

const Stats = () => {
  const dispatch = useAppDispatch();
  const { isLoading, monthlyApplications } = useAppSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length && <ChartsContainer />}
    </>
  );
};

export default Stats;
