// Agrega la función handleKeyPress para manejar el evento de teclado
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Detener el evento por defecto del formulario
        buscarProductos();
    }
}
function buscarProductos() {
    const productName = document.getElementById("productName").value;

    // Limpiar resultados anteriores
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    // Realizar la búsqueda utilizando Fetch y Promesas
    fetch(
        `https://my-json-server.typicode.com/gabox2002/my-fake-db/electro?q=${productName}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud de búsqueda");
            }
            return response.json();
        })
        .then((productos) => {
            const resultsContainer =
                document.getElementById("resultsContainer");
            resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

            if (productos.length > 0) {
                // Si se encontraron productos, crear cards y mostrarlas
                productos.forEach((producto) => {
                    const card = document.createElement("div");
                    card.classList.add("product-card");

                    const cardContent = `
    <div class="product-image">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="button-group">
            <span title="Agregar al carrito" onclick="agregarAlCarrito(${
                producto.id
            })">
                <i class="fa-solid fa-shopping-cart details__button" aria-hidden="true"></i>
            </span>
        </div>
    </div>
    <div class="product-details">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Marca: ${producto.marca}</p>
        <p>Descripción: ${producto.descripcion}</p>
    </div>
`;

                    card.innerHTML = cardContent;
                    resultsContainer.appendChild(card);
                });
            } else {
                // Si no se encontraron productos, mostrar un mensaje
                const noResultsMessage = document.createElement("p");
                noResultsMessage.textContent = "No se encontraron productos.";
                resultsContainer.appendChild(noResultsMessage);
            }
        })

        .catch((error) => {
            console.error(error);
            // Manejar errores, por ejemplo, mostrar un mensaje al usuario
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error al realizar la búsqueda.";
            resultsContainer.appendChild(errorMessage);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementById("resultsContainer");

    // Agrega el evento de clic al contenedor de resultados
    resultsContainer.addEventListener("click", function (event) {
        // Verifica si el clic fue en un elemento con la clase 'product-card'
        if (event.target.closest(".product-card")) {
            // Encuentra el 'button-group' dentro del elemento 'product-card'
            const buttonGroup = event.target
                .closest(".product-card")
                .querySelector(".button-group");

            // Modifica el estilo del 'button-group'
            if (buttonGroup) {
                buttonGroup.style.zIndex = "1";
            }
        }
    });

    // Llama a buscarProductos al cargar la página para mostrar todos los productos por defecto
    window.onload = buscarProductos;
});
