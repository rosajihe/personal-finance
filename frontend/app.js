const API_URL = "http://127.0.0";

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
    const ctx = document.getElementById('finance-chart').getContext('2d');
    
    // Filtrar solo los gastos y agruparlos por categoría
    const expenses = transactions.filter(tx => tx.type === "expense");
    const categories = [...new Set(expenses.map(tx => tx.category))];
    
    const totalsByCategory = categories.map(category => {
        return expenses
            .filter(tx => tx.category === category)
            .reduce((sum, tx) => sum + tx.amount, 0);
    });

    // Crear el gráfico de tipo Dona (Doughnut)
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: totalsByCategory,
                backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", init);