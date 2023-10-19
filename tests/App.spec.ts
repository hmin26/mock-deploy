import { test, expect } from "@playwright/test";

/**
 * Before each test, connects to a local server that will set up the mock program.
 */
test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

/**
 * Test to see if our project was correctly called and connected to the local server.
 * If done correctly, a button should be visible on the web page.
 */
test("Mock is correctly connected to local server", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
});

/**
 * Test to see if a successful load function provides the correct return statement.
 */
test("Command shows up in history after submit", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "CSV successfully loaded" })
  ).toBeVisible();
});

/**
 * Test to see if a successful mode function provides the correct return statement.
 */
test("Mode gives correct response", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Changed mode" })
  ).toBeVisible();
});

/**
 * Test to see if multiple mode switches can be done. Other functions such as loading
 * and viewing were also called, and their results were checked to see if for verbose,
 * the command is visible on screen while for brief, the command isn't visible.
 */
test("Mode can switch multiple times", async ({ page }) => {
  //switched to verbose
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit a command" }).click();
  //loading file- expect a verbose response
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Command:" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "load_file mockCSV1" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Output:" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "CSV successfully loaded" })
  ).toBeVisible();
  //switched back to brief
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit a command" }).click();
  //viewing loaded file- expect a brief response
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "view" })
  ).toBeHidden();
});

/**
 * Test to see if a failed call to a load function provides the correct return statement.
 * Should specify that the load function takes in filepath as well.
 */
test("Load empty file path", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "loadcsv command takes in a filepath" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a view function provides the correct return statement.
 * Should specify that the view function can only be called after a csv file is loaded.
 */
test("View before load", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Must load a csv before viewing" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a view function provides the correct return statement.
 * Should specify that the view function could not find the csv file that was initially loaded.
 */
test("View nonexistent file", async ({ page }) => {
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file nonexistentCSV");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Csv file non-existent" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a search function provides the correct return statement.
 * Should specify that the search function can only be called after a csv file is loaded.
 */
test("Search before load", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search test test");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Must load a csv before searching" })
  ).toBeVisible();
});

/**
 * Test to see if the search function can take in either a number index or the name of the column.
 * Should return two different mock results, with a list of numbers given when inputting a column index,
 * and a list of string given when inputting a column name.
 */
test("Search column can take in number or string", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  //column input is a number- expect mockSearch1
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 3 1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "2" })
  ).toBeVisible();
  //column input is a string- expect mockSearch2
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search testCol keyword");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "song" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a search function provides the correct return statement.
 * Should specify that the search function takes in a column and keyword as well.
 */
test("Search invalid arguments", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "searchcsv command takes in ColumnInfo and a target" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a load function provides the correct return statement.
 * When the column name/index is not present, "Column not present" should be returned.
 * The mock search function checks if "error" was inputted as the column name.
 */
test("Search nonpresent column", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search error error");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Column not present" })
  ).toBeVisible();
});

/**
 * Test to see if a failed call to a load function provides the correct return statement.
 * When the keyword is not present, an empty list should be returned.
 * The mock search function checks if "empty" was inputted as the keyword.
 */
test("Search nonpresent keyword", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search empty empty");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "" })
  ).toBeVisible();
});

/**
 * Test to verify verbose works as intended. After calling the search function,
 * the resulting output should be in the format of: "Command:" for the first line,
 * the inputted command on the second, "Output:" for the third line, and the
 * resulting mock output on the fourth.
 */
test("Verbose search", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 3 1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Command:" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "search 3 1" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Output:" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "2" })
  ).toBeVisible();
});

/**
 * Test to check if the correct return statement is given
 * when the user inputs a command that isn't search, load_file, view, or mode.
 */
test("Invalid command", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("Not a command");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(
    page.getByRole("cell", { name: "Invalid command" })
  ).toBeVisible();
});


/**
 * Test to check if multiple files can be loaded and then viewed. After loading the first mock csv file,
 * the view function should give data on that file. After loading the second mock csv file,
 * the second time the view function is called, data of the second file should be returned.
 */
test("can load and view different files", async ({ page }) => {
  //First mock csv file is loaded and viewed
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV1");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(page.getByRole("cell", { name: "2" })).toBeVisible(); 

  //Second mock csv file is loaded and viewed
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file mockCSV2");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit a command" }).click();
  await expect(page.getByRole("cell", { name: "cherry" })).toBeVisible();
});
