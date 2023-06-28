import * as React from 'react';
import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Users = () => {
    const { data, error, loading } = useGet('/api/admin/users');
    const headers = [
        'ID',
        'Nom d\'utilisateur',
        'Email',
        'Rôles',
        'Actions'
    ];

    if (loading) {
        return <SuspenseLoader children={<></>} />;
    }
    if (error) {
        return <div>Erreur : {error}</div>;
    }
    if (!data || data.length === 0) {
        return <div>Aucune donnée disponible</div>;
    }
    const adaptedData = data.map((user: any) => ({
        ID: user.id,
        'Nom d\'utilisateur': user.username,
        Email: user.email,
        Rôles: user.roles.join(', '),
        Actions: <div>
            <IconButton aria-label="edit" size="large" color="primary">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="large" color="error">
                <DeleteIcon />
            </IconButton>
        </div>
    }));

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h1>Tableau d'utilisateurs</h1>
                <TableComponent headers={headers} data={adaptedData} />
            </div>
        </div>
    );
};

export default Users;