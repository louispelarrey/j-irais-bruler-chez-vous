import TableComponent from '../../components/Admin/Table/TableComponent';
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export const Trashs = () => {
    const { data, error, loading } = useGet('/api/admin/trashs');

    const headers = [
        'Image',
        'ID',
        'Référence',
        'Description',
        'Adresse',
        'Statut',
        'Date de création',
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

    const adaptedData = data.map((trash: any) => ({
        Image: <img src={trash.fileImageUrl} alt="image" style={{ width: '100px' }} />,
        ID: trash.id,
        Référence: trash.reference,
        Description: trash.description,
        Adresse: trash.address,
        Statut: trash.isBurned ?
        <LocalFireDepartmentIcon />
        :
        <LocalFireDepartmentIcon color="error"/>
        ,
        'Date de création': trash.createdAt,
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
                <h1>Tableau des poubelles</h1>
                <TableComponent headers={headers} data={adaptedData} />
            </div>
        </div>
    );
};

export default Trashs;