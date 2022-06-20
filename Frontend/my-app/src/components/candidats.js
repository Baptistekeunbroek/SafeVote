import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTable } from 'react-table';
import './candidats.css';
import { Voter } from './voter';

export function Candidats() {
  const [candidats, setCandidats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkAuthentication', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.auth);
        if (!res.data.auth) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/getcandidats', {
        withCredentials: true,
      })
      .then((res) => {
        setCandidats(res.data.candidats);
        console.log(res.data.candidats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Numéro',
        accessor: 'idCandidat',
      },
      {
        Header: 'Prenom',
        accessor: 'prenomC',
      },
      {
        Header: 'Nom',
        accessor: 'nomC',
      },
      {
        Header: 'Parti politique',
        accessor: 'partiPolitique',
      },
    ],
    []
  );

  //   const tableInstance = useTable({ columns, data });

  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });

    // Render the UI for your table
    console.log(data);
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="candidats">
      <h1 className="h1Candidats">Liste des candidats</h1>

      <Table columns={columns} data={candidats} />
      <Voter candidats={candidats} />
    </div>
  );
}

export default Candidats;
