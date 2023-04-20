import useGet from "./useGet";

export interface Trash {
    id: string;
    name: string;
    description: string;
}

export const useTrash = () => {
    const { data, error, loading } = useGet("/api/trashs");

    if(loading) {
        return { trash: [], error: undefined, loading: true };
    }

    if(error) {
        return { trash: [], error, loading: false };
    }

    const trash: Trash[] = data.map((item: Trash) => ({
        id: item.id,
        name: item.name,
        description: item.description,
    }));

    return { data, error, loading };
}