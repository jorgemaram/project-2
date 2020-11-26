
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
                <div class="col-md-4 background-container">
                    <div class="card profile-card-3 mb-4 background-card">
                        <div class="background-block">
                           
                        </div>
                        <div class="profile-thumb-block">
                            <img src="${user.image}" alt="" class="profile" />
                        </div>
                        <div class="card-content">
                            <a href="detalles/${user._id}"><h2>@${user.username}</h2></a><small>${user.description}</small></h3>
                        </div>
                    </div>
                </div> `
        })
        .join('');
    usersList.innerHTML = htmlString;
};

loadUsers();



