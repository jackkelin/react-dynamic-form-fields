import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const styles = {
  root: {
    border: "none",
    padding: "0",
    margin: "0"
  }
};

function MultiGroup({
  id,
  optionType,
  options,
  onChange,
  label,
  selectedOption
}) {
  return (
    <fieldset id={id} style={styles.root}>
      <h4>{label}</h4>
      {options.map((o, index) => {
        return (
          <React.Fragment key={`MultiGroup-option-${o}`}>
            <label>{o}</label>
            <input
              type={optionType}
              name={id}
              value={o}
              onChange={onChange}
              checked={o === selectedOption ? true : false}
            />
          </React.Fragment>
        );
      })}
    </fieldset>
  );
}

MultiGroup.propTypes = {
  optionType: PropTypes.oneOf(["radio", "checkbox"]),
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  onChange: PropTypes.func
};

MultiGroup.defaultProps = {
  id: shortid.generate()
};

export default MultiGroup;
