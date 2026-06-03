# 💰 Personal Finance Dashboard & API

Un ecosistema Full-Stack diseñado para la gestión, control y análisis visual de finanzas personales. Este proyecto implementa una arquitectura desacoplada con validación estricta de datos en el servidor y renderizado dinámico asíncrono en la interfaz de usuario.

---

## 🚀 Características del Proyecto
*   **Persistencia de Datos Real:** Integración con base de datos relacional para almacenamiento permanente.
*   **Validación de Esquemas:** Control riguroso de tipos de datos de entrada mediante tipado estático en el servidor.
*   **Operaciones Asíncronas:** Consumo e intercambio de datos asíncronos en tiempo real mediante el uso de `async/await` y la Fetch API.
*   **Dashboard Visual Interactivo:** Procesamiento matemático de transacciones y representación gráfica automatizada por categorías.
*   **Documentación Interactiva:** Autogeneración de documentación técnica Swagger accesible por los desarrolladores.

---

## 🛠️ Stack Tecnológico

### Backend (Servidor e Infraestructura)
*   **Python 3.13:** Lenguaje principal de programación.
*   **FastAPI:** Framework de alto rendimiento y baja latencia para la construcción de la API REST.
*   **SQLAlchemy (ORM):** Mapeo objeto-relacional para la abstracción y gestión de consultas SQL.
*   **Pydantic:** Validación integrada de esquemas JSON y sanitización de datos de entrada.
*   **SQLite:** Motor de base de datos relacional ligero y de alto rendimiento embebido.
*   **Uvicorn:** Servidor ASGI de nivel de producción para la ejecución del framework.

### Frontend (Interfaz de Usuario Nativa)
*   **JavaScript (ES6+):** Programación reactiva nativa para la manipulación del DOM y peticiones de red.
*   **HTML5 & CSS3:** Estructuración semántica y diseño visual responsivo adaptable a dispositivos móviles.
*   **Chart.js:** Biblioteca especializada para la renderización del lienzo gráfico dinámico.

---

## 📂 Arquitectura de Archivos

```text
📦 personal-finance-dashboard
 ┣ 📂 backend                 # Lógica del servidor y reglas de negocio
 ┃ ┣ 📜 database.py           # Conexión, motor y ciclo de vida de sesiones SQL
 ┃ ┣ 📜 main.py               # Configuración del servidor, CORS y endpoints REST
 ┃ ┗ 📜 models.py             # Definición de tablas y esquemas relacionales
 ┣ 📂 frontend                # Interfaz visual y experiencia de usuario
 ┃ ┣ 📜 chart.js              # Biblioteca de gráficos localizada
 ┃ ┣ 📜 index.html            # Contenedor semántico de la aplicación
 ┃ ┣ 📜 styles.css            # Estilos visuales modernos y variables globales
 ┃ ┗ 📜 app.js                # Lógica del cliente, fetch asíncrono y control de eventos
 ┣ 📜 .gitignore              # Configuración de exclusiones para Git
 ┗ 📜 requirements.txt        # Registro estricto de dependencias de Python
```

---

## 🔧 Instalación y Despliegue Local

### Requisitos Previos
*   Python 3.10 o superior instalado en el sistema.

### Configuración del Backend
1. Clonar el repositorio localmente.
2. Crear e iniciar el entorno virtual de Python:
   ```bash
   python -m venv .venv --without-pip
   # En Windows (PowerShell):
   .venv\Scripts\activate
   ```
3. Instalar las dependencias del proyecto:
   ```bash
   python -m ensurepip --upgrade
   pip install -r requirements.txt
   ```
4. Levantar el servidor de desarrollo:
   ```bash
   python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
   ```

### Acceso a la Documentación Interactiva
Una vez encendido el servidor backend, la documentación técnica interactiva y las pruebas de los endpoints se encuentran disponibles en:
*   **Swagger UI:** `http://127.0.0`

### Configuración del Frontend
1. Abrir el archivo `frontend/index.html` utilizando un servidor local como la extensión **Live Server** en VS Code.
2. Acceder a la interfaz en la dirección asignada (por defecto `http://127.0.0`).
