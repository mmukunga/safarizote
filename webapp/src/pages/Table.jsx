import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(head => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr>
              {headers.map(head => (
                <td>{row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;