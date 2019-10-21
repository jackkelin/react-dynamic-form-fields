export default [
  {
    type: "custom-field-definitions",
    id: "1579",
    attributes: {
      fieldTypeDisplay: "Dropdown List",
      tabName: "Questionnaire",
      groupName: "Accredited Investor Questionnaire",
      // This is an example of a field type with a uri to fetch options
      optionsUri: "https://jsonplaceholder.typicode.com/users",
      name: "Investors",
      fieldType: "DROPDOWN",
      required: false,
      resourceType: "contacts",
    }
  },
  {
    type: "custom-field-definitions",
    id: "3761",
    attributes: {
      fieldTypeDisplay: "Dropdown List",
      tabName: "Values",
      groupName: "Values",
      selectOptions: ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"],
      name: "Dropdown Test",
      fieldType: "DROPDOWN",
      required: false,
      resourceType: "portfolio-holdings",
    }
  },
  {
    type: "custom-field-definitions",
    id: "19369",
    attributes: {
      fieldTypeDisplay: "Radio Button List",
      tabName: "Standard",
      groupName: "Words",
      selectOptions: ["Option A", "Option B", "Option C"],
      name: "Radio Button List",
      fieldType: "RADIO_BUTTON_LIST",
      required: false,
      resourceType: "contacts",
    }
  }
];
