import React from "react";

const Table = ({ headers, data }) => {
    console.log('Table');
    console.log(headers);
    console.log(data);
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
                <td>SMS{head} {row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;