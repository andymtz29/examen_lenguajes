class Catalogo {
    #peliculas = [];

    constructor() {
        this.init();
    }

    init() {
        document.querySelector('#agregarPeliculaBtn').addEventListener('click', () => this.obtenerPelicula());
    }

    obtenerPelicula() {
        const titulo = document.querySelector('#titulo').value;
        const genero = document.querySelector('#genero').value;
        const ano = document.querySelector('#ano').value;
        const url = document.querySelector('#myURL').value;

        if (!titulo || !genero || !ano || !url) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, rellene todos los campos',
            });
        } else {
            const nuevaPelicula = { titulo, genero, ano, url };
            this.agregarPelicula(nuevaPelicula);
            this.limpiarFormulario();
            Swal.fire({
                icon: 'success',
                title: '¡Agregado!',
                text: 'La película ha sido agregada al catálogo',
            });
        }
    }

    agregarPelicula(pelicula) {
        this.#peliculas.push(pelicula);
        this.mostrarPeliculas();
    }

    actualizarPelicula(index, nuevaPelicula) {
        this.#peliculas[index] = nuevaPelicula;
        this.mostrarPeliculas();
    }

    eliminarPelicula(index) {
        this.#peliculas.splice(index, 1);
        this.mostrarPeliculas();
    }

    mostrarPeliculas() {
        const contenedor = document.querySelector('.row.row-cols-1.row-cols-md-4.g-4');
        contenedor.innerHTML = '';

        this.#peliculas.forEach((pelicula, index) => {
            const card = `
                <div class="col" id="pelicula-${index}">
                    <div class="card h-80">
                        <img src="${pelicula.url}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <p class="card-text">Género: ${pelicula.genero}</p>
                            <p class="card-text">Año De Producción: ${pelicula.ano}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-warning btn-sm" onclick="catalogo.actualizar(${index})">Actualizar</button>
                            <button class="btn btn-danger btn-sm" onclick="catalogo.eliminar(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>`;
            contenedor.innerHTML += card;
        });
    }

    actualizar(index) {
        const titulo = prompt('Nuevo título:');
        const genero = prompt('Nuevo género:');
        const ano = prompt('Nuevo año de producción:');
        const url = prompt('Nueva URL:');

        if (titulo && genero && ano && url) {
            const nuevaPelicula = { titulo, genero, ano, url };
            this.actualizarPelicula(index, nuevaPelicula);
        } else {
            alert('Por favor, rellene todos los campos');
        }
    }

    eliminar(index) {
        this.eliminarPelicula(index);
    }

    limpiarFormulario() {
        document.querySelector('#titulo').value = '';
        document.querySelector('#genero').value = '';
        document.querySelector('#ano').value = '';
        document.querySelector('#myURL').value = '';
    }
}

const catalogo = new Catalogo();
