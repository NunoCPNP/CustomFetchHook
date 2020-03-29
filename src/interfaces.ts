export interface Info {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface HookState {
    isFetching: boolean;
    isSuccessful: boolean;
    errorMessage: string;
    result: Info | null;
}