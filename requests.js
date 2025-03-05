// Llamada para cargar el archivo JSON y procesarlo
document.addEventListener('DOMContentLoaded', function() {
    // Función que carga el JSON
    function cargarDatos() {
        fetch('datos.json')  // Intenta cargar el archivo JSON
            .then(response => {
                if (!response.ok) {  // Verifica si la respuesta fue exitosa
                    throw new Error('Error al cargar los datos JSON');
                }
                return response.json();  // Convierte la respuesta a JSON
            })
            .then(data => {
                procesarDatos(data);  // Procesa los datos
            })
            .catch(error => {
                console.error('Hubo un problema con la carga del archivo JSON:', error);
                document.getElementById('links-container').innerHTML = '<p>Hubo un error al cargar los enlaces.</p>';
            });
    }

    // Función que procesa los datos y actualiza el HTML
    function procesarDatos(data) {
        const container = document.getElementById('links-container');
        container.innerHTML = '';  // Limpiar cualquier contenido previo

        // Verifica que los datos sean correctos
        if (data.links && Array.isArray(data.links)) {
            data.links.forEach(link => {
                const div = document.createElement('div');
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.title;
                a.target = "_blank";  // Para abrir en una nueva pestaña

                div.appendChild(a);
                container.appendChild(div);
            });
        } else {
            container.innerHTML = '<p>No se encontraron enlaces disponibles.</p>';
        }
    }

    // Llama a la función para cargar los datos
    cargarDatos();
});
