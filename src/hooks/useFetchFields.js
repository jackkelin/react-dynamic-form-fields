import { useState, useEffect } from "react";

const endpoints = {
  fields: "http://localhost:3004/fields"
};

const transform = {
  users: {
    deserialize: data => data.map(d => d.name)
  }
};

export const getOptionUrls = data => {
  return data.reduce((acc, curr) => {
    if (curr.attributes.optionsUri) {
      acc.push({
        id: curr.id,
        url: curr.attributes.optionsUri
      });
    }
    return acc;
  }, []);
};

function useFetchFields() {
  const [data, setData] = useState(undefined);
  const [optionsToFetch, setOptionsToFetch] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  // fetch fieldTypes
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(endpoints.fields, {
          type: "GET"
        });
        const json = await response.json();
        setData(json);
        const fieldsWithOptionUrls = getOptionUrls(json);
        setOptionsToFetch(fieldsWithOptionUrls);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  // fetch options
  useEffect(() => {
    (async () => {
      if (data && optionsToFetch) {
        let _data = data;
        const requests = optionsToFetch.map(o => fetch(o.url, { type: "GET" }));
        const responses = await Promise.all(requests);
        const jsonArr = await Promise.all(responses.map(r => r.json()));
        jsonArr.forEach((json, i) => {
          const fieldId = optionsToFetch[i].id;
          _data = _data.map(d => {
            if (d.id === fieldId) {
              // we should handle data based off field type, this will be tricky!
              d.attributes.selectOptions = transform.users.deserialize(json);
            }
            return d;
          });
        });
        setData(_data);
        setOptionsToFetch(undefined);
      }
    })();
  }, [data, optionsToFetch]);

  return [data, isLoading, isError];
}

export default useFetchFields;
