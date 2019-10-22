import { getOptionUrls } from "./useFetchFields";

describe("getOptionUrls method", () => {
  let data;
  beforeEach(() => {
    data = [
      {
        id: 123,
        attributes: {
          optionsUri: "foo"
        }
      },
      {
        id: 345,
        attributes: {
          values: []
        }
      },
      {
        id: 567,
        attributes: {
          option: "123"
        }
      }
    ];
  });
  it("should output an array with a single object", () => {
    expect(getOptionUrls(data)).toStrictEqual([
      { id: data[0].id, url: data[0].attributes.optionsUri }
    ]);
  });
});
