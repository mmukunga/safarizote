
import React from "react";

function Table({ children, ...props }) {
    console.log( props);
    console.log( props.data);
    const firstRow = props.data[0];
    console.log('1.firstRow..');
    console.log(firstRow);
    console.log('2.firstRow..');
    const headers = Object.keys(firstRow);
    console.log('1.response..');
    const headerRow = headers.map(el => <Table.TH>{el}</Table.TH>);
    console.log('2.response..');
    const rows = props.data.map(el => { 
        console.log(el);
        return (
        <Table.TR>
          {Object.values(el).map(el => {
              console.log('MyEl:=' + el);
              return (
                <Table.TD>'el'</Table.TD>
              )}  
          )}
        </Table.TR>

      );
    });

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