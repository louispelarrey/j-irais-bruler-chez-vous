import * as React from 'react';
import TableComponent from '../../components/Admin/Table/TableComponent';

export const Users = () => {
    const headers = ['id', 'name', 'age', 'email'];
    const data = [
        { id: 1, name: 'John Doe', age: 25, email: 'calcal52@gmail.Com' },
        { id: 2, name: 'Jane Smith', age: 30, email: 'calcal@gmail.Com'}
    ];

    return (
        <div>
            <h1>Tableau d'utilisateurs</h1>
            <TableComponent headers={headers} data={data} />
        </div>
    );
};

export default Users;