
/**
 * A function that mocks the results of a load function, 
 * which is called in the handleLoad function.
 * The result boolean variable checks if the result of the input
 * should be a successful or failed one, and the function returns 
 * messages accordingly.
 * @param result 
 * @returns 
 */
export function loadMock(result: boolean) {
  if (result) {
    return {
      result: "CSV successfully loaded",
      filepath: "/data/census-data",
    };
  } else {
    return {
      result: "error_datasource",
      filepath: "/data/bad-file-path",
    };
  }
}
/**
 * A function that mocks the results of a view function, 
 * which is called in the handleView function.
 * The csvName string variable checks the name of the csv file
 * the user wants to view, and returns the contents of the mockCSV file
 * accordingly. If the csv file that the user wants to search isn't one of the
 * two mock files, an error message is returned.
 * @param csvName 
 * @returns 
 */
export function viewMock(csvName: string) {
  if (csvName.match("mockCSV1")) {
    return {
      result: "CSV successfully viewed",
      details: mockCSV1,
    };
  } 
  else if (csvName.match("mockCSV2")) {
    return {
      result: "CSV successfully viewed",
      details: mockCSV2,
    }
  }
    else {
    return {
      result: "error_csv_not_loaded",
      details: "Csv file non-existent",
    };
  }
}
/**
 * A function that mocks the results of a search function, 
 * which is called in the handleSearch function.
 * The index boolean checks if the user inputted an index number
 * for the column, as opposed to inputting the column term.
 * @param index 
 * @param col 
 * @param target 
 * @returns 
 */
export function searchMock(index: boolean, col: string, target: string) {

  if (col === "error") {
    return {
      result: [["Column not present"]],
      colInfo: col,
      target: target,
    }
  }
  if (target === "empty") {
    return {
      result: [[]],
      colInfo: col,
      target: target,
    }
  }
  if (index) {
    return {
      result: mockSearch1,
      colInfo: col,
      target: target,
    };
  } else {
    return {
      result: mockSearch2,
      colInfo: col,
      target: target,
    };
  }
}
/**
 * Mock parsed csv data used to demonstrate functionality of the view function.
 * Is in the format of an array of array of numbers or strings.
 * Is called in the viewMock function above.
 */
export const mockCSV1 = [
  [1, 2, 3, 4, 5],
  ["the", "song", "remains", "the", "same"],
  [6, 7, 8, 9, 10],
  ["henry", "min", "is", "so", "cute"],
];

export const mockCSV2 = [
  ["apple", "cherry", "date"],
  [4, 5, 6],
  [7, 8, 9],
  ["date", "fig", "tangerine"]
];
/**
 * Mock output of the search function, assuming the parsed csv data is the 
 * mock data above, mockCSV1. Is in the format of an array of array of numbers or
 * strings, as the output can contain multiple lists.
 * Is called in the searchMock function above.
 */
export const mockSearch1 = [[1, 2, 3, 4, 5]];

export const mockSearch2 = [["the", "song", "remains", "the", "same"]];
