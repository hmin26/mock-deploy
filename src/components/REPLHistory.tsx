import "../styles/main.css";
import { Component } from "react";

interface REPLHistoryProps {
  history: (string | number)[][][];
}

/**
 * 
 * @param elt This function handles the inputted 2D arrays given through REPLInput. 
 * After every list, there is a line break and then for each list, the elements
 * on that list are handled as individual items.
 * @returns 
 */
function renderElt(elt: (string | number)[][]) {
  return (
    <table style={{ width: 500 }}>
      <tbody>
        {elt.map((rowContent, rowID) => (
          <tr>
            {rowContent.map((item, index) => (
              <td>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command, index) => renderElt(command))}
    </div>
  );
}
