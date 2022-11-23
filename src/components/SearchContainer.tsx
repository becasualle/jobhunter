import { FormRow, FormRowSelect } from ".";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  handleChange,
  FieldName,
  clearFilters,
} from "../features/allJobs/allJobsSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );

  const jobTypeFilters = ["all", ...jobTypeOptions];
  const jobStatusFilters = ["all", ...statusOptions];
  const dispatch = useAppDispatch();

  // lazy loading search string
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceId = setTimeout(() => {
      dispatch(handleChange({ name: "search", value: searchTerm }));
    }, 750);
    return () => clearTimeout(debounceId);
  }, [searchTerm, dispatch]);

  const handleSearch: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    // if (isLoading) return;
    const name = e.target.name as FieldName;
    const value = e.target.value;

    if (name === "search") {
      setSearchTerm(value);
      return;
    }

    dispatch(handleChange({ name, value }));
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* Search Position */}
          <FormRow
            type="text"
            name="search"
            value={searchTerm}
            handleChange={handleSearch}
          />
          {/* Search By Status */}
          <FormRowSelect
            handleChange={handleSearch}
            list={jobStatusFilters}
            name="searchStatus"
            value={searchStatus}
            labelText="status"
          />
          {/* Search By Type */}
          <FormRowSelect
            handleChange={handleSearch}
            list={jobTypeFilters}
            name="searchType"
            value={searchType}
            labelText="type"
          />
          {/* Sort */}
          <FormRowSelect
            handleChange={handleSearch}
            list={sortOptions}
            name="sort"
            value={sort}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
