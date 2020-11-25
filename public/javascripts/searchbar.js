
const usersList = document.getElementById('usersList')
const searchBar = document.getElementById('searchBar')

let registeredUsers = [];

searchBar.addEventListener('keyup', (e) => {

    const searchString = e.target.value
    const filteredCharacters = registeredUsers.filter((user) => {
        const nameValue = user.name
        const name = [...nameValue]
        console.log(name)
        return (name.join('').toLowerCase().includes(searchString))
    })
    displayCharacters(filteredCharacters)
})

const loadUsers = async () => {

    try {
        const res = await fetch('/api/usuarios');
        registeredUsers = await res.json();
        displayCharacters(registeredUsers);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (users) => {

    const htmlString = users
        .map((user) => {
            return `
            <li class="user">
                <a href="detalles/${user._id}"><h2>${user.name}</h2></a>
                <p>Género: ${user.gender}</p>
                <img src="${user.image}"></img>
            </li>
        `;
        })
        .join('');
    usersList.innerHTML = htmlString;
};

loadUsers();