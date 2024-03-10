document.addEventListener("DOMContentLoaded", function() {
    llenarTabla();
});

function llenarTabla() {
    // Obtener los datos de los usuarios del localStorage
    var users = JSON.parse(localStorage.getItem("users"));

    // Obtener la tabla
    var tableBody = document.getElementById("scoreTableBody");

    // Limpiar cualquier contenido existente en la tabla
    tableBody.innerHTML = "";

    // Verificar si hay usuarios y agregarlos a la tabla
    if (users && users.length > 0) {
        users.forEach(function(user) {
            var userData = JSON.parse(user);
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${userData.userName}</td>
                <td>${userData.userScore}</td>
<<<<<<< HEAD
                
=======
                <td>${userData.tiempo}</td>
>>>>>>> 344325770e18a11a3f9d622643071ebfae66f0d4
            `;
            tableBody.appendChild(row);
        });
    } else {
        // Si no hay usuarios, mostrar un mensaje en la tabla
        var row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3">No hay datos disponibles</td>
        `;
        tableBody.appendChild(row);
    }
}