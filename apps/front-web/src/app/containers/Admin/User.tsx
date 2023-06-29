import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserModalComponent from '../../components/Admin/Modal/UserModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    email: string;
    username: string;
}

export const Users = () => {
    const { data, error, loading } = useGet('/api/admin/users');
    const headers = [
        'ID',
        'Nom d\'utilisateur',
        'Email',
        'Rôles',
        'Actions'
    ];
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    const handleUpdateUser = async (username: string) => {
        if(selectedUser) {
            const response = await fetch(`
            ${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${selectedUser.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    username
                }),
            });
            const data = await response.json();
            if(data.statusCode === 401) {
                navigate('/logout');
            }
            if(data.id) {
                navigate('/admin/user');
            }
        }
    };


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
            <IconButton aria-label="edit" size="large" color="primary" onClick={() => handleEditUser(user)}>
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
                <h1>Tableaau d'utilisateurs</h1>
                <TableComponent headers={headers} data={adaptedData} />
                {selectedUser && (
                    <UserModalComponent
                        open={openModal}
                        onClose={handleCloseModal}
                        onSubmit={handleUpdateUser}
                        defaultValue={selectedUser}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;