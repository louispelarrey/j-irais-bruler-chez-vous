import useGet from "./useGet";

export interface Trash {
    id: string;
    name: string;
    description: string;
}

export const useTrash = ( id?: string ) => {
    const url = id ? `/api/trashs/${id}` : "/api/trashs";
    const { data, error, loading } = useGet(url);

    if(loading) {
        return { data: [], error: undefined, loading: true };
    }

    if(error) {
        return { data: [], error, loading: false };
    }

    const trash: Trash[] = data
        ? data.map((item: Trash) => ({
            id: item.id,
            name: item.name,
            description: item.description,
        }))
    : [
        {
            id: data.id,
            name: data.name,
            description: data.description,
        }
    ];

    return { data, error, loading };
}