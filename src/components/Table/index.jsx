import React from 'react'

const Table = ({ headers, rows }) => {
  return (<div className="">

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50 text-black ${rowIndex === rows.length - 1 ? 'dark:border-gray-700' : ''
                }`}
            >
              <td key={rowIndex} className="px-6 py-4">
                {rowIndex+1}
              </td>
              {row.map((cell, cellIndex) => (<>
                <td key={cellIndex} className="px-6 py-4">
                  {cell}
                </td>
              </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

  );
};


export default Table;