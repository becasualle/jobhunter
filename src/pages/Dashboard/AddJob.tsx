import { useEffect, MouseEventHandler, ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FormRow, FormRowSelect } from "../../components";
import {
  handleChange,
  FieldName,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
type Props = {};

const AddJob = (props: Props) => {
  const {
    company,
    isEditing,
    isLoading,
    jobLocation,
    jobType,
    jobTypeOptions,
    position,
    status,
    statusOptions,
    editJobId,
  } = useAppSelector((store) => store.job);

  const { user } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user?.location ? user.location : "",
        })
      );
    }
    return () => {
      dispatch(clearValues());
    };
  }, [dispatch, isEditing, user?.location]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ company, jobLocation, jobType, position, status }));
  };

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const name = e.target.name as FieldName;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
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
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleInput}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleInput}
          />
          <FormRowSelect
            list={statusOptions}
            name="status"
            value={status}
            handleChange={handleInput}
          />
          <FormRowSelect
            list={jobTypeOptions}
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleInput}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearValues());
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
