# Tabla-periodica
Pseudocódigo
Este tiene varias opciones para entrar a realizar lo que tienen que hacer.
Si se elige el tipo de Orden, se puede elegir entre Masa atomica, num Atómico y alfabetico. De ahí
se puede elegir si es de manera ASC (ASCENDENTE) y DES (DESCENDENTE).
Una vez que esto este elegido entrará a unos ciclos que se encargarán de intercambiar de posiciones dependiendo
si es asc o des.
Si se elige el tipo "type" entonces el usuario podrá elegir uno por uno los tipos de los elementos
de la manera que se quiera.
Una vez echo esto entonces, entrará a unos bucles donde revisará los tipos elegidos por el usuario y verificará
si el elemento que está revisando tiene el mismo tipo.

Diagrama BBDD
Tabla ElementType
En esta tabla van los tipos de los elementos, esto debido a que un tipo puede pertenecer a varios elementos.
Tabla Element
Aquí irán todos lo emementos, estos tendrán el id del tipo de elemento que le pertenece, así evitamos estar escribiendo
varias veces un mismo tipo en varios elementos.
Tabla User
Aquí irán los usuarios que se resgistren.
ElementUser
Aquí se guardarán los elementos del usuario, teniendo el id del usuario y el id del elemento, esto para evitar que
que otros usuarios modifiquen los elementos de la BBDD y así evitar que a la hora de que un usuario nuevo se registre
no cuente con los elementos. La manera de modificar la tabla será cambiandolos de posición y pudiendolos eliminar,
obtener y crear los elementos que se eliminaron.