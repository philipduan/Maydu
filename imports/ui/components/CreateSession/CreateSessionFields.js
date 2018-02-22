import React from 'react';

const CreateSessionFields = ({
  name,
  inputOnChange,
  type,
  placeholder,
  className
}) => {
  return (
    <input
      name={name}
      onChange={event => inputOnChange(event)}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default CreateSessionFields;
