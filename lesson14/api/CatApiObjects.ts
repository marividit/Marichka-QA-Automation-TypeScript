const BASE_URL = process.env.CAT_API_BASE_URL || 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY || '';

const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
};

if (API_KEY) {
    defaultHeaders['x-api-key'] = API_KEY;
}

type ApiResult = {
    status: number;
    json: () => Promise<any>;
};

async function requestJson(path: string, init: RequestInit = {}): Promise<ApiResult> {
    const url = `${BASE_URL}${path}`;
    const headers = {
        ...defaultHeaders,
        ...(init.headers || {}),
    } as Record<string, string>;

    const res = await fetch(url, { ...init, headers });
    const text = await res.text();
    const body = text ? JSON.parse(text) : undefined;

    return {
        status: res.status,
        json: async () => body,
    };
}

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
    const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
    return query ? `?${query}` : '';
}

export interface CatBreed {
    id: string;
    name: string;
    origin: string;
    temperament: string;
    description: string;
    life_span: string;
    [key: string]: unknown;
}

export interface CatImage {
    id: string;
    url: string;
    width?: number;
    height?: number;
    breeds?: CatBreed[];
    [key: string]: unknown;
}

export interface Favourite {
    id: number;
    image_id: string;
    image: CatImage;
    [key: string]: unknown;
}

export interface Vote {
    id: number;
    image_id: string;
    value: number;
    image?: CatImage;
    [key: string]: unknown;
}

async function resolveImage(imageId: string): Promise<CatImage | undefined> {
    const result = await requestJson(`/images/${encodeURIComponent(imageId)}`);
    if (result.status !== 200) return undefined;
    return result.json();
}

export const BreedsApi = {
    list: async (): Promise<ApiResult> => requestJson('/breeds'),
};

export const ImagesApi = {
    search: async (params: { limit?: number; breed_ids?: string; page?: number; order?: string } = {}): Promise<ApiResult> => {
        const query = buildQuery(params);
        return requestJson(`/images/search${query}`);
    },
};

export const FavouritesApi = {
    list: async (): Promise<ApiResult> => {
        const res = await requestJson('/favourites');
        const list = await res.json();

        if (!Array.isArray(list)) {
            return res;
        }

        const enriched = await Promise.all(list.map(async (item: any) => {
            if (item && item.image) {
                return item;
            }

            if (item && item.image_id) {
                const image = await resolveImage(item.image_id);
                return { ...item, image };
            }

            return item;
        }));

        return {
            status: res.status,
            json: async () => enriched,
        };
    },
    create: async (body: { image_id: string; sub_id?: string }): Promise<ApiResult> => {
        const res = await requestJson('/favourites', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        return res;
    },
    delete: async (id: number): Promise<ApiResult> => requestJson(`/favourites/${id}`, { method: 'DELETE' }),
};

export const VotesApi = {
    create: async (body: { image_id: string; value: number; sub_id?: string }): Promise<ApiResult> => {
        const res = await requestJson('/votes', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        const data = await res.json();

        if (data && !data.image && body.image_id) {
            const image = await resolveImage(body.image_id);
            return {
                status: res.status,
                json: async () => ({ ...data, image }),
            };
        }

        return res;
    },
};
