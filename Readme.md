# Codelance_: second project at Ironhack Madrid

Project based on the use of ExpressJS, NodeJS, MongoDB and CRUD operations.

The main objective of this app is the posibility to link people with different knowledges and ideas and all together develop new projects from different users. 

They could search by username and also they will find a map in which it will show an area where users use to work.

Moreover, they could add their own projects to their profiles and other users could find if it could be interesting or not to collaborate with them.

## Install

- Please, you should run the command `npm i` on the root directory of your device.

## Instructions 

- There is not a `.env` so you should create one in order to includes your own database (`DB`), port (`PORT`), Cloudinary configs ((`CLOUDINARY_NAME`), (`CLOUDINARY_KEY`), (`CLOUDINARY_SECRET`)) and a Google Cloud Api Key for the use of Google Maps (`APIKEY`).
- Run `npm run dev` command on the root directory.

## Endpoints table

| Id | Method | Path | Description|
| ------ | ------ | ------ | ------ |
| 0 | get | / | Show the homepage |
| 1 | get | /api/usuarios | Show markers on Google Maps |
| 2 | get | /auth/registro | Show user sign up form |
| 3 | post | /auth/registro | Send user sign up form to the database and a new user is registered |
| 4 | get | /auth/inicio-sesion | Show login form |
| 5 | post | /auth/inicio-sesion | Allow a user to login |
| 6 | get | /auth/cerrar-sesion | User logout |
| 7 | get | /usuario | Show user's profile |
| 8 | get | /usuario/lista | Show different user's profiles from the database |
| 9 | get | /usuario/editar?id=xxx | Show edit fomr in order to edit user's profile |
| 10 | post | /usuario/editar?id=xxx | Send edit form of user's profile to the database |
| 11 | get | /usuario/detalles/:id | Show another user's details |
| 12 | get | /usuario/borrar?id=xxx | Delete user's profile from the database |
| 13 | get | /productos/nuevo | Show product form to add a new product to the database |
| 14 | post | /productos/nuevo | Send the information of the new product to the database |
| 15 | get | /productos/editar?id=xxx | Show the edit product form |
| 16 | post | /productos/editar?id=xxx | Send the edit product form to the database |
| 17 | get | /productos/detalles/:id | Show product's details from another user |
| 18 | get | /productos/eliminar?id=xxx | Delete a product from the database |
| 19 | get | /contacto | Show contact form to require assitance |
| 20 | post | /contacto | Send the contact form to require assistance |
