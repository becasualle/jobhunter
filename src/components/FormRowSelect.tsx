import React from "react";

type Props = {
  name: string;
  value: string;
  labelText?: string;
  list: string[];
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
};

const FormRowSelect = ({
  name,
  value,
  labelText,
  list,
  handleChange,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
