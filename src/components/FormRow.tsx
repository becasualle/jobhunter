import React from "react";

type Props = {
  type: string;
  name: string;
  value: string;
  labelText?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormRow = ({ type, name, value, labelText, handleChange }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
