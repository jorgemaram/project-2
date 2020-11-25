
const usersList = document.getElementById('usersList')
const searchBar = document.getElementById('searchBar')

let registeredUsers = [];

console.log(searchBar)
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredCharacters = registeredUsers.filter((user) => {
        return (user.name.toLowerCase().includes(searchString) || user.house.toLowerCase().includes(searchString))
    })
    displayCharacters(filteredCharacters)
})
const loadUsers = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
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
                <h2>${user.name}</h2>
                <p>House: ${user.house}</p>
                <img src="${user.image}"></img>
            </li>
        `;
        })
        .join('');
    usersList.innerHTML = htmlString;
};

loadUsers();