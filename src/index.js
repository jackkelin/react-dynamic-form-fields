import React, { useState } from "react";
import ReactDOM from "react-dom";

import MultiGroup from "./MultiGroup";
import Select from "./Select";

import useFetchFields from "./hooks/useFetchFields";

const fieldComponentMap = {
  DROPDOWN: {
    apiName: "DROPDOWN",
    component: Select
  },
  RADIO_BUTTON_LIST: {
    apiName: "RADIO_BUTTON_LIST",
    component: MultiGroup
  }
};

function App() {
  const [fieldState, setFieldState] = useState({});
  const [data, isLoading, errored] = useFetchFields();

  const applyAdditionalFieldProps = fieldData => {
    // Apply props based off fieldType
    switch (fieldData.attributes.fieldType) {
      case fieldComponentMap.RADIO_BUTTON_LIST.apiName:
        const id = `${fieldData.id}__${fieldData.attributes.fieldType}`;
        return {
          optionType: "radio",
          label: fieldData.attributes.name,
          id,
          onChange: event => {
            event.persist();
            setFieldState(prevState => ({
              ...prevState,
              [id]: event.target.value
            }));
          },
          selectedOption: fieldState[id]
        };
      default:
        return {};
    }
  };

  const renderFields = fieldData => {
    // Build fields programatically with api data
    return fieldData.map((field, index) => {
      const component = fieldComponentMap[field.attributes.fieldType].component;
      return React.createElement(component, {
        key: `renderFields__${index}`,
        options: field.attributes.selectOptions
          ? field.attributes.selectOptions
          : [],
        ...applyAdditionalFieldProps(field)
      });
    });
  };
  return (
    <div className="App">
      <h2>Form fields generated from mock data</h2>
      <hr />
      {isLoading && "Loading.."}
      {errored && "Opps.."}
      {data && renderFields(data)}
      <hr />
      <p>Display state below:</p>
      <code>
        fieldState:
        <ul>
          {Object.keys(fieldState).map((s, i) => (
            <li key={`${s}__i`}>
              {s}: {fieldState[s]}
            </li>
          ))}
        </ul>
      </code>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
