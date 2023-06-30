import TableComponent from "../../components/Admin/Table/TableComponent";
import useGet from "../../hooks/useGet";
import { SuspenseLoader } from "../../suspense/SuspenseLoader";

interface Message {
    id: string;
    message: string;
    senderId: string;
    createdAt: string;
    updatedAt: string;
    roomId: string;
}

export const Messages = () => {
    const { data, error, loading, refetch }: { data: Message[] | undefined, error: string | undefined, loading: boolean, refetch: Function } = useGet('/api/admin/messages');

    const handleUpdateMessage = async (messageData: any) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/messages/${messageData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(messageData),
            });

        if (response.ok) {
            refetch();
        }
    };

    const handleDeleteMessage = async (id: string) => {
        const response = await fetch(`
        ${import.meta.env.VITE_APP_BACKEND_URL}/api/messages/${id}`,
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

    if(loading) {
        return <SuspenseLoader children={<></>} />;
    }
    if(error) {
        return <div>Erreur : {error}</div>;
    }
    if(!data || data.length === 0) {
        return <div>Aucune donnée disponible</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h1>Tableau des messages</h1>

                <TableComponent data={data} edit={handleUpdateMessage} del={handleDeleteMessage} />
            </div>
        </div>
    );
};

export default Messages;