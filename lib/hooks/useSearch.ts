

type SearchResult = {
    id: number;
    title: string;

};


async function fetchSearchResults(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    

}



