let speed = 300; // Velocidad predeterminada en milisegundos
let timer = 180; // 3 minutos en segundos
let timerInterval;
let currentIndex = 0;
let lines = [
    "El día se despide lentamente entre colores apagados.",
    "Una ligera neblina cubre los valles, envolviendo todo en misterio.",
    "Las primeras gotas de lluvia caen, trayendo consigo el aroma de la tierra húmeda.",
    "El aire fresco susurra entre las ramas, dando vida a la naturaleza dormida.",
    "La luz del crepúsculo se desvanece, dejando lugar a la penumbra de la noche.",
    "Los pájaros se ocultan en silencio, preparándose para el descanso.",
    "El viento sopla suavemente, moviendo las hojas con un murmullo casi imperceptible.",
    "La luna aparece lentamente, iluminando el horizonte con su brillo plateado.",
    "Todo a su alrededor parece entrar en un estado de quietud y serenidad.",
    "El momento invita a la reflexión, mientras la naturaleza se entrega al descanso.",
    "Las estrellas comienzan a parpadear tímidamente en el cielo, anunciando la llegada de la noche.",
    "A lo lejos, el suave murmullo del mar acompaña la tranquilidad del anochecer."
];


document.getElementById('startBtn').addEventListener('click', startExercise);

function startExercise() {
    // Obtener la velocidad ingresada por el usuario
    const userSpeed = document.getElementById('speed').value;
    speed = parseInt(userSpeed) || 300; // Asignar la velocidad del usuario, o 300ms si no es válida

    document.getElementById("exerciseArea").classList.remove("hidden");
    document.getElementById("p1").classList.add("hidden");
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    // Inicializar el temporizador
    startTimer();

    // Comenzar a mostrar las líneas de texto con el subrayado
    showNextLines();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function showNextLines() {
    const textArea = document.getElementById('textArea');
    const thirdLine = document.getElementById('thirdLine');
    textArea.innerHTML = ''; // Limpiar el área de texto antes de mostrar nuevas líneas
    thirdLine.innerHTML = ''; // Limpiar la tercera línea

    if (currentIndex < lines.length) {
        // Mostrar las siguientes dos líneas de texto
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        const line3 = document.createElement('div'); // Nueva línea de texto
        line1.classList.add('line', 'active');
        line2.classList.add('line', 'active');
        line3.classList.add('line', 'active'); // Nueva línea de texto
        line1.innerText = lines[currentIndex];
        line2.innerText = lines[currentIndex + 1] || ""; // Mostrar la siguiente línea o vacía si no existe
        line3.innerText = lines[currentIndex + 2] || ""; // Nueva línea de texto o vacía si no existe
        textArea.appendChild(line1);
        textArea.appendChild(line2);
        thirdLine.appendChild(line3); // Añadir la nueva línea de texto

        // Resaltar la primera línea
        highlightLine(line1, () => {
            // Después de que termine, resaltar la segunda línea
            highlightLine(line2, () => {
                // Resaltar la tercera línea
                highlightLine(line3, () => {
                    // Avanzar al siguiente trío de líneas después de que se resalte la tercera
                    currentIndex += 3;

                    // Si llegamos al final, reiniciar el ciclo
                    if (currentIndex >= lines.length) {
                        currentIndex = 0;
                    }

                    // Continuar con las siguientes líneas después de un pequeño retraso
                    setTimeout(showNextLines, speed);
                });
            });
        });
    }
}

function highlightLine(line, callback) {
    line.classList.add('highlight'); // Añadir el fondo de subrayado
    setTimeout(() => {
        line.classList.remove('highlight'); // Quitar el fondo después de la duración
        callback(); // Llamar a la siguiente acción
    }, speed);
}
