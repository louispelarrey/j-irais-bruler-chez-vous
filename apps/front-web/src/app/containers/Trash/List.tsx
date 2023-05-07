import { CardComponent } from "../../components/Shared/CardComponent";
import { Grid } from '@mui/material';
import useGet from "../../hooks/useGet";

interface List {
    id: string;
    reference: string;
    description: string;
}

export const Trashs = () => {
    const { data, error, loading } = useGet('/api/trashs');

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }

    return (
        <Grid container spacing={2} sx={{ maxWidth: '1280px', mx: 'auto', px: 2 , my: 2}}>
            {data.map((item: List) => (
                <CardComponent
                    key={item.id}
                    title={item.reference}
                    description={item.description}
                    image="https://images.unsplash.com/photo-1616489953149-8e1b0e1b5f0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    trashId={item.id}
                />
            ))}
        </Grid>
    )
}