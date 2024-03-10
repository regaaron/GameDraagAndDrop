document.addEventListener("DOMContentLoaded", function() {
    llenarTablaDescendente(); // Llenar tabla con tiempo descendente
    llenarTablaAscendente();  // Llenar tabla con tiempo ascendente
});

function llenarTablaDescendente() {
    var users = JSON.parse(localStorage.getItem("users"));
    var tableBody = document.getElementById("scoreTableBody");

    tableBody.innerHTML = "";

    if (users && users.length > 0) {
        users.sort(function(a, b) {
            return JSON.parse(b).userScore - JSON.parse(a).userScore;
        });

        users.forEach(function(user) {
            var userData = JSON.parse(user);
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${userData.userName}</td>
                <td>${userData.tiempo}</td>
                <td>${userData.userScore}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3">No hay datos disponibles</td>
        `;
        tableBody.appendChild(row);
    }
}

function llenarTablaAscendente() {
    var users = JSON.parse(localStorage.getItem("users"));
    var tableBody = document.getElementById("scoreTableBody2");

    tableBody.innerHTML = "";

    if (users && users.length > 0) {
        users.sort(function(a, b) {
            var tiempoA = JSON.parse(a).tiempo.split(':');
            var tiempoB = JSON.parse(b).tiempo.split(':');

            var minutosA = parseInt(tiempoA[0]);
            var segundosA = parseInt(tiempoA[1]);

            var minutosB = parseInt(tiempoB[0]);
            var segundosB = parseInt(tiempoB[1]);

            var totalSegundosA = minutosA * 60 + segundosA;
            var totalSegundosB = minutosB * 60 + segundosB;

            return totalSegundosA - totalSegundosB;
        });

        users.forEach(function(user) {
            var userData = JSON.parse(user);
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${userData.userName}</td>
                <td>${userData.tiempo}</td>
                <td>${userData.userScore}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="3">No hay datos disponibles</td>
        `;
        tableBody.appendChild(row);
    }
}
