// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    const listaAmigos = document.getElementById('listaAmigos');
    const errorMessage = document.querySelector('.error-message') || createErrorMessage();
    
    // Validar que el nombre no esté vacío
    if (nombre === '') {
        errorMessage.textContent = 'Por favor ingresa un nombre válido';
        errorMessage.style.display = 'block';
        inputAmigo.focus();
        return;
    }
    
    // Validar que el nombre no esté repetido
    if (amigos.includes(nombre)) {
        errorMessage.textContent = 'Este nombre ya está en la lista';
        errorMessage.style.display = 'block';
        inputAmigo.focus();
        return;
    }
    
    // Ocultar mensaje de error si existe
    errorMessage.style.display = 'none';
    
    // Agregar el nombre al array
    amigos.push(nombre);
    
    // Crear elemento de lista y agregarlo
    const li = document.createElement('li');
    li.textContent = nombre;
    
    // Botón para eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        eliminarAmigo(nombre, li);
    };
    
    li.appendChild(deleteBtn);
    listaAmigos.appendChild(li);
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para crear mensaje de error (si no existe)
function createErrorMessage() {
    const inputWrapper = document.querySelector('.input-wrapper');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    inputWrapper.parentNode.insertBefore(errorMessage, inputWrapper.nextSibling);
    return errorMessage;
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(nombre, element) {
    amigos = amigos.filter(amigo => amigo !== nombre);
    element.remove();
    
    // Ocultar resultado si no hay amigos
    if (amigos.length === 0) {
        document.getElementById('resultado').style.display = 'none';
    }
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    const errorMessage = document.querySelector('.error-message');
    
    // Validar que haya amigos en la lista
    if (amigos.length === 0) {
        errorMessage.textContent = 'Agrega al menos un amigo para sortear';
        errorMessage.style.display = 'block';
        resultado.style.display = 'none';
        return;
    }
    
    // Ocultar mensaje de error si existe
    errorMessage.style.display = 'none';
    
    // Seleccionar un amigo aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];
    
    // Mostrar el resultado
    resultado.innerHTML = `<li>¡El amigo secreto es: <strong>${amigoSecreto}</strong>!</li>`;
    resultado.style.display = 'block';
}

// Permitir agregar amigos con la tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});