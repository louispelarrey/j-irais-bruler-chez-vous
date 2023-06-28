import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export const Manifestations = () => {
    const { data, error, loading } = useGet('/api/admin/manifestations');

    const headers = [
        'ID',
        'Titre',
        'Description',
        'Ville',
        'Statut',
        'Date',
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

    const adaptedData = data.map((manifestation: any) => ({
        ID: manifestation.id,
        Titre: manifestation.title,
        Description: manifestation.description,
        Ville: manifestation.ville,
        Statut: manifestation.isActive ?
        <LocalFireDepartmentIcon color="error" />
        :
        <LocalFireDepartmentIcon />
        ,
        Date: manifestation.start_date,
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
                <h1>Tableau des manifestations</h1>
                <TableComponent headers={headers} data={adaptedData} />
            </div>
        </div>
    );
};

export default Manifestations;