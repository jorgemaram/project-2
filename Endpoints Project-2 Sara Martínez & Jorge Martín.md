# Referencia endpoints

| Id | Method | Path | Description|
| ------ | ------ | ------ | ------ |
| 0 | get | / | Muestra la página principal de la web |
| 1 | get | /api/usuarios |Muestra los usuarios en el mapa |
| 2 | get | /auth/registro | Muestra el formulario para el registro del usuario |
| 3 | post | /auth/registro | Envía la información del registro del usuario a la BBDD |
| 4 | get | /auth/inicio-sesion | Muestra el formulario para acceder a iniciar sesión |
| 5 | post | /auth/inicio-sesion | Permite el acceso al perfil del usuario |
| 6 | get | /auth/cerrar-sesion | Cierra la sesión del usuario |
| 7 | get | /usuario | Muestra el perfil del usuario |
| 8 | get | /usuario/lista | Muestra los diferentes perfiles de usuarios de la BBDD |
| 9 | get | /usuario/editar?id=xxx | Muestra el formulario para editar el perfil del usuario |
| 10 | post | /usuario/editar?id=xxx | Edita el perfil del usuario en la BBDD |
| 11 | get | /usuario/detalles/:id | Muestra los detalles del perfil de otro usuario |
| 12 | get | /usuario/borrar?id=xxx | Borra el perfil del usuario en la BBDD |
| 13 | get | /productos/nuevo | Muestra el formulario para crear un producto en la BBDD |
| 14 | post | /productos/nuevo | Envía la información del producto creado a la BBDD |
| 15 | get | /productos/editar?id=xxx | Muestra el formulario para editar el producto del usuario |
| 16 | post | /productos/editar?id=xxx | Edita el producto del usuario en la BBDD |
| 17 | get | /productos/detalles/:id | Muestra los detalles del producto de otro usuario |
| 18 | get | /productos/eliminar?id=xxx | Borra el producto del usuario en la BBDD |
| 19 | get | /contacto | Muestra el formulario para contactar con el personal del sitio web |
| 20 | post | /contacto | Envía el formulario para contactar con el personal del sitio web |
