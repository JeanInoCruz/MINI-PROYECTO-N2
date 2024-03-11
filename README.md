Mini Proyecto: API de Usuarios con Node.js y MySQL
El objetivo de este mini proyecto es crear una API en Node.js que sirva datos de usuarios en formato JSON, utilizando el módulo http. La API también debe ser capaz de exportar los datos de usuarios a un archivo CSV y de importar datos de usuarios desde un archivo CSV a una base de datos MySQL.

Especificaciones#
Ruta /:

Esta ruta muestra un archivo html con una interfaz sencilla al usuario:

Ruta /api/usuarios:

Esta ruta devolverá una lista de usuarios en formato JSON.
Cada usuario debe contener los siguientes campos:
id (identificador único del usuario)
nombres
apellidos
dirección
correo electrónico
dni (Documento Nacional de Identidad)
edad
fecha_creacion (fecha de creación del usuario)
telefono
(otros campos pueden ser agregados según necesidad)

Ruta /api/usuarios/export:

Esta ruta se encargará de exportar los datos de usuarios a un archivo CSV llamado “usuarios.csv”.
El archivo CSV debe contener una fila de encabezados con los nombres de los campos: id, nombres, apellidos, direccion, correo, dni, edad, fecha_creacion, telefono.
Cada fila subsiguiente del archivo CSV debe contener los datos de un usuario.


Ruta /api/usuarios/import:

Esta ruta se encargará de leer el archivo “usuarios.csv” y guardar los datos en la base de datos MySQL.
Se debe comprobar que los datos que se están guardando no estén repetidos en cuanto al id y al correo electrónico. No se deben subir filas repetidas.
Se pueden manejar errores como archivos no encontrados, formatos incorrectos, etc.
Además, se implementará una validación de datos para asegurar que los campos requeridos estén presentes y que tengan el formato adecuado (por ejemplo, validar el formato del correo electrónico).
