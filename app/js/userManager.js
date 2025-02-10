"use strict"

const URL = "localhost://3306";

export async function getAllUsers() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
}
export async function ShowAllUsersInTable() {
    let users = await getAllUsers();
    let html = "<table>";
    for (const one of users) {
        html += `<tr>
                    <td>
                        ${one.id}
                    </td>
                    <td>
                        ${one.username}
                    </td>
                    <td>
                        ${one.status}
                    </td>
                    <td>
                        ${one.gameSave}
                    </td>
                </tr>`
    }
    html += "</table>";
    document.querySelector("#tblMonstre").innerHTML = html;
}
export async function getOneUser(id) {
    const response = await fetch(URL + `?id=${id}`);
    const data = await response.json();
    console.log(data);
    if (data.id == null) {
        return null
    }
    else {
        return data
    }
}

export async function getOneUser(id) {
    let form = document.querySelector("form")
    let user = await getOneUser(id);
    form.elements["id"].value = user.id;
    form.elements["username"].value = user.username;
    form.elements["status"].value = user.status;
    form.elements["gameSave"].value = user.teethCount;
}

export async function ModifyOneUser(user) {
    const options = {
        method: "PUT",
        headers: new Headers({"Content-Type": "application/json" }),
        body: JSON.stringify(user),
        mode: "cors",
        redirect: "follow",
        //cache: "no-cache",
    };

    const response = await fetch(`${URL}?id=${user.id}`, options);

    if (response.ok) {
        let data = await response.json();
        console.log(data);
    }
    else {
        console.log(response.status, response.statusText);
    }
} 