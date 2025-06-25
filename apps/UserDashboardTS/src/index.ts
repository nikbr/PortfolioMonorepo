import { fetchUsers } from "./api.js";
import { transformUser, UserDashboard, hasProp, getPermissionsFor } from "./dashboard.js";
import { User, UserRole } from "./types.js";
console.log("Index.ts loaded!");
const listDOM = document.getElementById("userList")!;
const detailsDOM = document.getElementById("userDetails")!;
const dashboard = new UserDashboard({
    
    onSelect: (user: User) => {
            const hasPhone = hasProp(user, "phone");
            const perms = getPermissionsFor(user.role as UserRole);

        detailsDOM.innerHTML = `
            <b>Name:</b> ${user.name}<br>
            <b>Email:</b> ${user.email}<br>
            <b>Role:</b> ${user.role}<br>
            <b>Active:</b> ${user.isActive ? "Yes" : "No"}<br>
            <b>Phone:</b> ${hasPhone ? "Yes" : "No"}<br>
        <b>Permissions:</b> ${
            Object.entries(perms)
                .map(([perm, val]) => `${perm}: ${val ? "✅" : "❌"}`)
                .join(", ")
        }<br>
        `;
    },
    onDelete: (user: User) => {
        detailsDOM.innerHTML = `<i>User deleted</i>`;
    }
});

async function setup() {
    console.log("HELLO");
    const apiUsers = await fetchUsers();
console.log(apiUsers);
    const users = apiUsers.map(transformUser);
        console.log(users);
    dashboard.setUsers(users);

    // Show users
    listDOM.innerHTML = users
        .map(
            u =>
                `<li>
                    ${u.name} (${u.role}) 
                    <button data-id="${u.id}" class="select">Select</button>
                    <button data-id="${u.id}" class="delete">Delete</button>
                </li>`
        )
        .join("");

    // Event listeners (delegation)
    listDOM.addEventListener("click", (e) => {
        const t = e.target as HTMLElement;
        if (t.tagName === "BUTTON") {
            const id = Number(t.getAttribute("data-id"));
            if (t.classList.contains("select")) dashboard.selectUser(id);
            else if (t.classList.contains("delete")) {
                dashboard.deleteUser(id);
                // Remove from DOM for demo purposes
                t.parentElement?.remove();
            }
        }
    });
}

setup();