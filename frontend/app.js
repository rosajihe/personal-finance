const API_URL = "http://127.0.0.1:8000/api/transactions";

// Función principal que arranca la aplicación
async function init() {
    try {
        // 1. Llamada asíncrona a la API de Python
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // 2. Renderizar la lista en el HTML
        renderTransactions(data);
        
        // 3. Renderizar el gráfico con los datos procesados
        renderChart(data);
        
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        document.getElementById("transactions-list").innerHTML = 
            "<li class='expense'>Error de conexión con el servidor Python.</li>";
    }
}

// Renderiza los elementos en la lista
function renderTransactions(transactions) {
    const listElement = document.getElementById("transactions-list");
    listElement.innerHTML = ""; // Limpiar texto de carga

    transactions.forEach(tx => {
        const li = document.createElement("li");
        li.className = "list-item";
        
        // Formatear dinero y aplicar color según tipo
        const sign = tx.type === "income" ? "+" : "-";
        const cssClass = tx.type === "income" ? "income" : "expense";
        
        li.innerHTML = `
            <span>${tx.description} <small style="color: #888;">(${tx.category})</small></span>
            <span class="${cssClass}">${sign}$${tx.amount.toFixed(2)}</span>
        `;
        listElement.appendChild(li);
    });
}

// Procesa los datos y genera el gráfico
function renderChart(transactions) {
    const canvas = document.getElementById('finance-chart');
    const ctx = canvas.getContext('2d');
    
    // Si ya existe un gráfico previo, lo destruimos para evitar errores visuales al actualizar
    if (financeChartInstance) {
        financeChartInstance.destroy();
    }
    
    const expenses = transactions.filter(tx => tx.type === "expense");
    const categories = [...new Set(expenses.map(tx => tx.category))];
    
    const totalsByCategory = categories.map(category => {
        return expenses
            .filter(tx => tx.category === category)
            .reduce((sum, tx) => sum + tx.amount, 0);
    });

    // Guardamos la nueva instancia en la variable global
    financeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: totalsByCategory,
                backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#1abc9c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


// Variable global para almacenar la instancia del gráfico y poder destruirlo/recrearlo al actualizar datos
let financeChartInstance = null;

// Escuchar el envío del formulario
// Escuchar el envío del formulario de manera asíncrona
document.getElementById("finance-form").addEventListener("submit", async (e) => {
    e.preventDefault(); 

    // 1. Capturar los valores ingresados por el usuario
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    // 2. Crear el objeto JSON
    const newTransaction = {
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    try {
        // 3. Hacer la petición POST de forma asíncrona enviando el JSON
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTransaction)
        });

        if (response.ok) {
            // 4. Si Python responde exitosamente, limpiamos el formulario
            document.getElementById("finance-form").reset();
            
            // 5. Volvemos a ejecutar la función inicial para refrescar la lista y el gráfico al instante
            await init(); 
        } else {
            alert("Error en el servidor al intentar guardar los datos.");
        }

    } catch (error) {
        console.error("Error al enviar datos al backend:", error);
        alert("No se pudo establecer conexión con el servidor de Python.");
    }
});

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", init);