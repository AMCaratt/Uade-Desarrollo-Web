document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const enviarBtn = document.getElementById('enviarBtn');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    function isValidEmail(email) {
        // Expresión regular para una validación básica del formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para establecer los estados de validación de Bootstrap
    function setValidationState(inputElement, isValid) {
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
        }
    }

    // Función para mostrar mensajes de feedback (éxito/error)
    function showFeedbackMessage(message, type) {
        // Limpiar clases y contenido previos
        mensajeFeedback.innerHTML = '';
        mensajeFeedback.classList.remove('alert-success', 'alert-danger', 'd-block');
        mensajeFeedback.classList.add('d-none'); // Ocultar por defecto

        if (message) {
            mensajeFeedback.innerHTML = message;
            if (type === 'success') {
                mensajeFeedback.classList.add('alert', 'alert-success');
            } else if (type === 'error') {
                mensajeFeedback.classList.add('alert', 'alert-danger');
            }
            mensajeFeedback.classList.remove('d-none'); // Mostrar el mensaje
            mensajeFeedback.classList.add('d-block');
        }
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío predeterminado del formulario

        let formIsValid = true; // Bandera para controlar la validez general del formulario

        // Limpiar feedback y estados de validación anteriores
        showFeedbackMessage('', ''); // Limpiar cualquier mensaje de éxito/error previo
        contactForm.classList.remove('was-validated'); // Limpiar la clase 'was-validated' de Bootstrap

        // --- Validar Nombre ---
        if (nombreInput.value.trim() === '') {
            setValidationState(nombreInput, false);
            formIsValid = false;
        } else {
            setValidationState(nombreInput, true);
        }

        // --- Validar Email ---
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
            setValidationState(emailInput, false);
            formIsValid = false;
        } else {
            setValidationState(emailInput, true);
        }

        // --- Validar Mensaje ---
        if (mensajeInput.value.trim() === '') {
            setValidationState(mensajeInput, false);
            formIsValid = false;
        } else {
            setValidationState(mensajeInput, true);
        }

        // Mostrar feedback general basado en la validación
        if (!formIsValid) {
            showFeedbackMessage('Por favor, corrige los errores en el formulario.', 'error');
        
            contactForm.classList.add('was-validated');
        } else {
            showFeedbackMessage(`¡Gracias por tu contacto, ${nombreInput.value.trim()}! En breve te estaré respondiendo.`, 'success');
            contactForm.reset(); // Limpiar el formulario después de un envío exitoso
            nombreInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            mensajeInput.classList.remove('is-valid');
        }
    });

    // Opcional: Validación en tiempo real mientras el usuario escribe/interactúa (mejora la UX)
    nombreInput.addEventListener('input', () => {
        if (nombreInput.value.trim() !== '') {
            setValidationState(nombreInput, true);
        } else {
            nombreInput.classList.remove('is-valid', 'is-invalid'); // Limpiar estado si está vacío
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            setValidationState(emailInput, true);
        } else if (emailInput.value.trim() !== '') {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        } else {
             emailInput.classList.remove('is-valid', 'is-invalid'); // Limpiar estado si está vacío
        }
    });

    mensajeInput.addEventListener('input', () => {
        if (mensajeInput.value.trim() !== '') {
            setValidationState(mensajeInput, true);
        } else {
            mensajeInput.classList.remove('is-valid', 'is-invalid'); // Limpiar estado si está vacío
        }
    });
});