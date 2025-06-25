import { FetcherWithProps, UserFromAPI } from "./types.js";

export const fetchUsers : FetcherWithProps<UserFromAPI[]> = Object.assign(
    async function(){
        if (fetchUsers.cache) {
            return fetchUsers.cache;
        }
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users: UserFromAPI[] = await response.json();
        fetchUsers.cache = users;
        return users;
    },
    {cache: null as UserFromAPI[]|null}

);