# Referencia endpoints

| Id | Method | Path | Description|
| ------ | ------ | ------ | ------ |
| 0 | get | / | Muestra la página principal de la web |
| 1 | get | /api/users |Muestra los usuarios en el mapa |
| 2 | get | /auth/registro | Muestra el formulario para el registro del usuario |
| 3 | post | /auth/registro | Manda la información del registro del usuario a la BBDD |
| 4 | get | /auth/inicio-sesion | Muestra el formulario para acceder a iniciar sesión |
| 5 | post | /auth/inicio-sesion | Permite el acceso al perfil del usuario |
| 6 | get | /auth/cerrar-sesion | Cierra la sesión del usuario |
| 7 | get | /user | Muestra el perfil del usuario |
| 8 | get | /user/list | Muestra los diferentes perfiles de usuarios de la BBDD |
| 9 | get | /user/edit?id=xxx | Muestra el formulario para editar el perfil del usuario |
| 10 | post | /user/edit?id=xxx | Edita el perfil del usuario en la BBDD |
| 11 | get | /user/details/:id | Muestra los detalles del perfil de otro usuario |
| 12 | get | /user/delete?id=xxx | Borra el perfil del usuario en la BBDD |
| 13 | get | /products/new | Muestra el formulario para crear un producto en la BBDD |
| 14 | post | /products/new | Envía la información del producto creado a la BBDD |
| 15 | get | /products/edit?id=xxx | Muestra el formulario para editar el producto del usuario |
| 16 | post | /products/edit?id=xxx | Edita el producto del usuario en la BBDD |
| 17 | get | /products/details/:id | Muestra los detalles del producto de otro usuario |
| 18 | get | /products/delete?id=xxx | Borra el producto del usuario en la BBDD |
