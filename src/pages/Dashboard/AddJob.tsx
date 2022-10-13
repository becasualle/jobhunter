import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
type Props = {};

const AddJob = (props: Props) => {
  const {
    company,
    editJobId,
    isEditing,
    isLoading,
    jobLocation,
    jobType,
    jobTypeOptions,
    position,
    status,
    statusOptions,
  } = useAppSelector((store) => store.job);
  const dispatch = useAppDispatch();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
  };

  const handleInpit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit-job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleInpit}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleInpit}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleInpit}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                console.log("clear");
              }}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
