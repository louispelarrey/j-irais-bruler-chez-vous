import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';

interface Manifestation {
    id: string;
    title: string;
    ville: string;
    description: string;
    isActive: boolean;
    creatorId: string;
    start_date: string;
}

export const Manifestations = () => {
    const { data, error, loading, refetch }: { data: Manifestation[] | undefined, error: string | undefined, loading: boolean, refetch: Function } = useGet('/api/admin/manifestations');

    const handleUpdateManifestation = async (manifestationData: any) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/manifestations/${manifestationData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(manifestationData),
            });

        if (response.ok) {
            refetch();
        }
    };

    const handleDeleteManifestation = async (id: string) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/manifestations/${id}`,
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
                <h1>Tableau des manifestations</h1>
                <TableComponent data={data} edit={handleUpdateManifestation} del={handleDeleteManifestation}/>
            </div>
        </div>
    );
};

export default Manifestations;
