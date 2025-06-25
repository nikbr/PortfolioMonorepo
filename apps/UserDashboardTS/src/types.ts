export type UserRole = "admin"|"editor"|"viewer";

export type UserFromAPI = {
    id: number;
    name: string;
    username: string;
    email:string;
    phone:string;
}

type LocalUserFields = {
    isActive: boolean;
    role: UserRole;
};

export type User = UserFromAPI & LocalUserFields;
export type EditableUserFields = Partial<Omit<User, "id"|"username">> & Readonly<Pick<User, "id"|"username">>;

type PermissionKeys = "read" | "write" | "delete";
type AdminPerms = "write" | "read" | "delete";
type EditorPerms = "write" | "read";
type ViewerPerms = "read";

type PermissionsByRole = {
    admin: AdminPerms,
    editor: EditorPerms,
    viewer: ViewerPerms
}

export type UserPermissions = {
    [K in keyof PermissionsByRole]: {
        [P in PermissionsByRole[K]]: boolean;
    }
}

export type PermissionsFor<K extends keyof PermissionsByRole> = {
    [P in PermissionsByRole[K]]: boolean;
}

type RequiredStringKeys<T> = {
    [K in keyof T as K extends string ? (undefined extends T[K] ? never : K) : never]: T[K];
}

export type UserStringKeys = keyof RequiredStringKeys<User> & string;

export type UserActionCallback = (user: User) => void;

export type DashboardCallback<U> = {
    onSelect: (user: U) => void;
    onDelete: (user: U) => void;
};

export type FetcherWithProps<T> = {
    (): Promise<T>;
    cache: T|null;
}