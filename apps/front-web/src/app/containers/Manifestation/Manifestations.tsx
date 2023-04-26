import { CardComponent } from "../../components/Shared/CardComponent";
import { Grid } from '@mui/material';
import useGet from "../../hooks/useGet";

interface Manifestation {
    id: string;
    name: string;
    description: string;
}

export const Manifestations = () => {
    const { data, error, loading } = useGet('/api/manifestations');

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }
  console.log(data)
    return (
        <Grid container spacing={2} sx={{ maxWidth: '1280px', mx: 'auto', px: 2 , my: 2}}>
          <h1>Liste des manifestations</h1>
            {data.map((item: Manifestation) => (
                <CardComponent
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    redirectUrl={`manifestation/${item.id}`}
                />
            ))}
        </Grid>
    )
}
