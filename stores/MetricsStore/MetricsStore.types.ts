export interface Storage {
    getItem: (id: string) => Promise<string | null>;
    setItem: (id: string, value: string) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
}