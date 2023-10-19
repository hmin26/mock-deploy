import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { loadMock, viewMock, mockCSV1, searchMock } from "./mockedJson";

interface REPLInputProps {
  history: (string | number)[][][];
  setHistory: Dispatch<SetStateAction<(string | number)[][][]>>;
}
/**
 * This function reads in the user inputs that are stored as the commandString
 * variable. The handleSubmit function within REPLInput reads the commandString
 * variable, and calls various other functions that are mocking the search,
 * load, view, and mode commands. 
 * @param props 
 * @returns 
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [mode, setMode] = useState<boolean>(false);
  const [csv, setCsv] = useState<string>(""); // to represent the loaded CSV
  const [loaded, setLoaded] = useState<boolean>(false); 

  function handleSubmit(commandString: string) {
    console.log(' ' == 0)
    var out: string | (string[] | number[])[];
    //If user inputted mode, mode is changed through the handleMode helper function
    if (commandString == "mode") {
      out = handleMode();
    }
    //If user inputted view, the loaded csv file is viewed. 
    else if (commandString == "view") {
      out = handleView();
    } 
    //mode and view are the only registered one word inputs, so if the user didn't input
    //mode or view, the inputted words are parsed by checking spaces
    else {
      const args: string[] = commandString.split(" ", 3); // this way, we can get targets with spaces
      if (args[0] == "load_file") {
        if (args.length < 2) {
          // if load_file was inputted but no specific filepath was inputted
          out = "loadcsv command takes in a filepath";
        } else {
          //handleLoad takes in just the filepath
          out = handleLoad(args[1]);
        }
      } else if (args[0] == "search") {
        if (args.length < 3) {
          //if search was inputted but no column term/index or keyword was inputted
          out = "searchcsv command takes in ColumnInfo and a target";
        } else {
          //handleSearch takes in information on both the column and keyword
          out = handleSearch(args[1], args[2]);
        }
      } else {
        //every other input is not a registered command
        out = "Invalid command";
      }
    }
    //if the current mode is in verbose, and the out type is a string(for load and some instances of view),
    //make a 2D array that specifies the command and output and add to the history
    if (mode) {
      if (typeof out === "string") {
        const toAdd: (string[] | number[])[] = [
          ["Command: "],
          [commandString],
          ["Output: "],
          [out],
        ];
        props.setHistory([...props.history, toAdd]);
      } 
      // if the out type is a 2D array(for search and some instances of view),
      //make a 2D array that specific the command, concatenate this array with the out variable and
      //add to the history
      else {
        const base: (string[] | number[])[] = [
          ["Command: " + commandString],
          ["Output: "],
        ];
        const toAdd: (string[] | number[])[] = base.concat(out);
        props.setHistory([...props.history, toAdd]);
      }
    } 
    //If the current mode is brief, we convert the out variable to a 2D array
    //if necessary and add that to the history
    else {
      if (typeof out === "string") {
        const toAdd: (string[] | number[])[] = [[out]];
        props.setHistory([...props.history, toAdd]);
      } else {
        props.setHistory([...props.history, out]);
      }
    }
    //Reset the commandString
    setCommandString("");
  }
/**
 * When called, changes the mode between brief and verbose, and returns a message
 * signaling a successful change.
 * @returns 
 */
  function handleMode(): string {
    setMode((mode || true) && !(mode && true));
    return "Changed mode";
  }
/**
 * When called, sets the current file path to the inputted parameter,
 * and returns a mocked successful response no matter what the
 * csv file name is. 
 * @param filePath
 * @returns 
 */
  function handleLoad(filePath: string): string {
    setLoaded(true);
    setCsv(filePath);
    const out = loadMock(true); 
    return out.result;
  }
/**
 * When called, first checks if a csv file was already loaded.
 * If no csv file was loaded prior, returns an error message.
 * Otherwise, returns the mock csv file that load_file specified.
 * @returns 
 */
  function handleView(): string | (string[] | number[])[] {
    // need to check if a csv is loaded
    if (!loaded) {
      return "Must load a csv before viewing";
    }
    return viewMock(csv).details;
  }
/**
 * When called, first checks if a csv file was already loaded.
 * If no csv file was loaded prior, returns an error message.
 * Otherwise, after checking to see if the column input was a number
 * or a string, returns two different mock lists that mimic the results of a search function.
 * @param column 
 * @param target 
 * @returns 
 */
  function handleSearch(
    column: string,
    target: string
  ): string | (string[] | number[])[] {
    // check if a csv is loaded
    if (!loaded) {
      return "Must load a csv before searching";
    }
    const colNum = parseInt(column);
    
    // check if colNum is NaN, and returns mock searched data accordingly
    if (!isNaN(colNum)) {
      return searchMock(true, column, target).result;
    } else {
      return searchMock(false, column, target).result;
    }
  }

  return (
    <div className="repl-input">
      {}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submit a command
        
      </button>
      
    </div>
  );
}
