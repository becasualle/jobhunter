import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { showStats } from "../../features/allJobs/allJobsSlice";

type Props = {};

const Stats = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);
  return <div>Stats</div>;
};

export default Stats;
