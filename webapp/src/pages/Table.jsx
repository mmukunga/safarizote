
import React from "react";

function Table({ children, ...props }) {
    const firstRow = []||props.data[0];
    console.log('1.firstRow..');
    console.log(firstRow);
    console.log('2.firstRow..');
    const headers = Object.keys(firstRow);
    console.log('1.response..');
    const headerRow = headers.map(el => <Table.TH>{el}</Table.TH>);
    console.log('2.response..');
    const rows = props.data.map(el => (
        <Table.TR>
          {Object.values(el).map(el => (
            <Table.TD>el</Table.TD>
          ))}
        </Table.TR>
      ));

      return (
        <table {...props}>
            <Table.TR>
              {headerRow}
            </Table.TR>
            <tbody>{rows}</tbody>
        </table>
      );
    }

Table.TH = function TH(props) {
  return <th {...props} />;
};

Table.TR = function TR(props) {
  return <tr {...props} />;
};

Table.TD = function TD(props) {
  return <td {...props} />;
};

export default Table;