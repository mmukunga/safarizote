
import React from "react";
import parse from "html-react-parser";

function Table({ children, ...props }) {
    const firstRow = props.data[0];

    const headers = Object.keys(firstRow);
    const headerRow = headers.map(el => <Table.TH>{el}</Table.TH>);
    const rows = props.data.map(el => { 
        return (
        <Table.TR>
          {Object.values(el).map(el => {
              return (
                <Table.TD>{Number.isInteger(el) ? el : parse(el)}</Table.TD>
              )}  
          )}
        </Table.TR>

      );
    });

      return (
        <table {...props} style={{fontSize: 11, border: '1px solid black', textAlign:'left', borderCollapse: 'collapse'}}>
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