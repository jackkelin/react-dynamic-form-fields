import React from "react";
import PropTypes from "prop-types";

function Select({ options, selected, onChange }) {
  return (
    <select>
      {options.map(o => (
        <option key={`Select-option-${o}`}>{o}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
