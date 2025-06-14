document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del Modo Claro/Oscuro ---
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body; // El elemento <body>

    // Función para establecer el modo (claro u oscuro)
    function setMode(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); // Guardar preferencia
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light'); // Guardar preferencia
        }
    }

    // Cargar la preferencia del usuario al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setMode(savedTheme); // Aplicar el tema guardado
    } else {
        // Opcional: Establecer un tema por defecto si no hay preferencia guardada (ej. 'light')
        setMode('light'); // O 'dark' si quieres que el oscuro sea el predeterminado
    }

    // Escuchadores de eventos para los botones
    if (lightModeBtn) { // Asegúrate de que el botón exista antes de añadir el listener
        lightModeBtn.addEventListener('click', () => setMode('light'));
    }
    if (darkModeBtn) { // Asegúrate de que el botón exista antes de añadir el listener
        darkModeBtn.addEventListener('click', () => setMode('dark'));
    }

    // --- Lógica de Validación del Formulario (lo que ya tenías) ---
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const enviarBtn = document.getElementById('enviarBtn');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setValidationState(inputElement, isValid) {
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
        }
    }

    function showFeedbackMessage(message, type) {
        mensajeFeedback.innerHTML = '';
        mensajeFeedback.classList.remove('alert-success', 'alert-danger', 'd-block');
        mensajeFeedback.classList.add('d-none');

        if (message) {
            mensajeFeedback.innerHTML = message;
            if (type === 'success') {
                mensajeFeedback.classList.add('alert', 'alert-success');
            } else if (type === 'error') {
                mensajeFeedback.classList.add('alert', 'alert-danger');
            }
            mensajeFeedback.classList.remove('d-none');
            mensajeFeedback.classList.add('d-block');
        }
    }

    // Asegúrate de que contactForm exista antes de añadir el listener
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let formIsValid = true;

            showFeedbackMessage('', '');
            contactForm.classList.remove('was-validated');

            if (nombreInput.value.trim() === '') {
                setValidationState(nombreInput, false);
                formIsValid = false;
            } else {
                setValidationState(nombreInput, true);
            }

            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                setValidationState(emailInput, false);
                formIsValid = false;
            } else {
                setValidationState(emailInput, true);
            }

            if (mensajeInput.value.trim() === '') {
                setValidationState(mensajeInput, false);
                formIsValid = false;
            } else {
                setValidationState(mensajeInput, true);
            }

            if (!formIsValid) {
                showFeedbackMessage('Por favor, corrige los errores en el formulario.', 'error');
                contactForm.classList.add('was-validated');
            } else {
                showFeedbackMessage(`¡Gracias por tu contacto, ${nombreInput.value.trim()}! En breve te estaré respondiendo.`, 'success');
                contactForm.reset();
                nombreInput.classList.remove('is-valid');
                emailInput.classList.remove('is-valid');
                mensajeInput.classList.remove('is-valid');
            }
        });
    }


    // Optional: Real-time validation as user types/interacts (makes UX better)
    // Asegúrate de que los inputs existan antes de añadir listeners
    if (nombreInput) {
        nombreInput.addEventListener('input', () => {
            if (nombreInput.value.trim() !== '') {
                setValidationState(nombreInput, true);
            } else {
                nombreInput.classList.remove('is-valid', 'is-invalid');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
                setValidationState(emailInput, true);
            } else if (emailInput.value.trim() !== '') {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.classList.remove('is-valid', 'is-invalid');
            }
        });
    }

    if (mensajeInput) {
        mensajeInput.addEventListener('input', () => {
            if (mensajeInput.value.trim() !== '') {
                setValidationState(mensajeInput, true);
            } else {
                mensajeInput.classList.remove('is-valid', 'is-invalid');
            }
        });
    }
});