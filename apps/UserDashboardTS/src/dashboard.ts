import {
    User, UserFromAPI, UserRole, EditableUserFields, PermissionsFor, DashboardCallback
} from './types.js';

//generate role for demo
function assignRandomRole(): UserRole{
    const roles = ["admin", "editor", "viewer"] as const;
    return roles[Math.floor(Math.random() * roles.length)];
}

export function getPermissionsFor(role: UserRole): PermissionsFor<UserRole> {
    if (role === "admin") return { read: true, write: true, delete: true };
    if (role === "editor") return { read: true, write: true, delete: false };
    return { read: true, write: false, delete: false };
}

export function transformUser(u: UserFromAPI) : User { 
    const role = assignRandomRole();
    return {
        ...u,
        isActive: Math.random() > 0.3,
        role
    };
}

export class UserDashboard{
    private users: User[] = [];
    public selectedUser: User|null = null;
    public callbacks: DashboardCallback<User>;
    constructor(callbacks: DashboardCallback<User>) {
        this.callbacks = callbacks;
    }
     setUsers(users: User[]) {
        this.users = users;
    }
    getUsers() {
        return this.users;
    }
    selectUser(userId:number){
        const user = this.users.find(u => u.id === userId) || null;
        this.selectedUser = user;
        if(user) this.callbacks.onSelect(user);
    }
    deleteUser(userId:number){
        this.users = this.users.filter(u=>u.id!==userId);
        if(this.selectedUser?.id===userId) this.selectedUser = null;
        const user: User | undefined = this.users.find(u => u.id === userId);
        if(user) this.callbacks.onDelete(user);
    }
}

export function hasProp(obj: object, prop: string): boolean{
    return Object.prototype.hasOwnProperty.call(obj, prop);
    //safer than obj.hasOwnProperty in case obj has a method like that defined already
}