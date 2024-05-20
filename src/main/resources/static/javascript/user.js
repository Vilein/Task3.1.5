const userurl = '/user/user';

const authUser = fetch(userurl).then(response => response.json())
authUser.then(user => {
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name.replaceAll("ROLE_", "")
        })
    document.getElementById("navbar-email").innerHTML = "<strong>" + user.userName + "</strong> with roles: <strong>" + roles + "</strong>"
        // document.getElementById("navbar-roles").innerHTML = roles
    }
)

async function getUserPage() {
    let page = await fetch(userurl);

    if(page.ok) {
        let user = await  page.json();
        getInformationAboutUser(user);
    } else {
        alert(`Error, ${page.status}`)
    }
}
function  getInformationAboutUser(user) {
    const tableBody = document.getElementById('usertbody');
    let dataHtml = '';
    let roles = [];
    console.log('userSata', JSON.stringify(user))
    for (let role of user.roles) {roles
        roles.push(" " + role.name.toString()
            .replaceAll("ROLE_", ""))
    }
    dataHtml =
        `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.userName}</td>
    <td>${roles}</td>   
</tr>`

    tableBody.innerHTML = dataHtml;
}
getUserPage();