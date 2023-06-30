import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';

interface Trash {
    id: string;
    reference: string;
    description: string;
    address: string;
    posterId: string;
    burners: string[];
    isBurned: boolean;
    fileImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export const Trashs = () => {
    const { data, error, loading, refetch }: { data: Trash[] | undefined, error: string | undefined, loading: boolean, refetch: Function } = useGet('/api/admin/trashs');

    const handleUpdateTrash = async (trashData: any) => {
        const response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${trashData.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(trashData),
        });

        if (response.ok) {
            refetch();
        }
    };

    const handleDeleteTrash = async (id: string) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${id}`,
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
                <h1>Tableau des poubelles</h1>
                <TableComponent data={data} edit={handleUpdateTrash} del={handleDeleteTrash} />
            </div>
        </div>
    );
};

export default Trashs;
