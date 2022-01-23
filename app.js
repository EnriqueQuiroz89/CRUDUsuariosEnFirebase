console.log("Agregado");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC7IxVax8cZ5eLwEhlHE5leNVlX7TBUIQ0",
    authDomain: "firestorecrud-f8226.firebaseapp.com",
    projectId: "firestorecrud-f8226",
});

var db = firebase.firestore();

// Agregar documentos
function guardar() {

    //Ocupamos el DOM para traer valores de los campos  --->Creamos variables
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);

            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Leer Documentos

// Creamos una var de donde queremos pintar la tabla
var tabla = document.getElementById('tabla');

// Sin UPDATE en Tiempo Real
/**db.collection("users").get().then((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().born}`);
        tabla.innerHTML += `<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        </tr>`
    });
});*/

//  UPDATE en Tiempo Real
/** Cambios 
 * Remplaza get()  por onSnapshot()
 * Se Elimina .get().then((querySnapshot)...) y queda .onSnapshot((querySnapshot)...) 
 */

db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().born}`);
        tabla.innerHTML += `<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>`
    });
});

// Borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// Editar un documento

function editar(id, nombre, apellido, fecha) {

    // Escribe en los campos los valores del renglon seleccionado
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    // Reemplaza "GUARDAR" por "EDITAR" en hot
    boton.innerHTML = 'Editar';

    // Crea una funcion anonima para ejecutar cuando se haga click
    boton.onclick = function () {
        // El ID no va a cambiar
        var washingtonRef = db.collection("users").doc(id);
        // Capturar los cambios en los Textfield si los hubo
        var nombreAlterado = document.getElementById('nombre').value;
        var apellidoAlterado = document.getElementById('apellido').value;
        var fechaAlterado = document.getElementById('fecha').value;

        // realiza la actualizacion
        return washingtonRef.update({
            first: nombreAlterado,
            last: apellidoAlterado,
            born: fechaAlterado
        })
            .then(() => {
                console.log("Document successfully updated!");
                // Si exito Regresa al boton su nombre original "Guardar"
                boton.innerHTML = ' Guardar';
                // Limpia los campos
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }


}






