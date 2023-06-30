import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';

interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
}

export const Users = () => {
    const { data, error, loading, refetch }: { data: User[] | undefined, error: string | undefined, loading: boolean, refetch: Function } = useGet('/api/admin/users');

    const handleUpdateUser = async (userData: any) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${userData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userData),
            });

        if (response.ok) {
            refetch();
        }
    };


    const handleDeleteUser = async (id: string) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });

        if (response.ok) {
            refetch();
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h1>Tableau d'utilisateurs</h1>

                <TableComponent data={data} edit={handleUpdateUser} del={handleDeleteUser} />
            </div>
        </div>
    );
};

export default Users;