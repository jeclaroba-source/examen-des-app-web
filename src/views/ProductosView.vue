<template>
  <div class="container mt-4">
    <div
  v-if="mensaje"
  class="alert alert-success"
>
  {{ mensaje }}
</div>
<div class="card mb-3 shadow-sm">
  <div class="card-body">
    <h5 class="mb-0">
      <i class="bi bi-box-seam"></i>
      Total Productos: {{ productos.length }}
    </h5>
  </div>
</div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>
  <i class="bi bi-box-seam"></i>
  Gestión de Productos
</h1>

      <button
  class="btn btn-success"
  data-bs-toggle="modal"
  data-bs-target="#productoModal"
>
  <i class="bi bi-plus-circle"></i>
Nuevo Producto
</button>
    </div>

    <div
  class="card mb-4"
  v-if="false"
>
      <div class="card-body">
        <h4 class="mb-3">Crear Producto</h4>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nombre</label>

            <input
              type="text"
              class="form-control"
              v-model="nombre"
            >
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Categoría</label>

            <input
              type="text"
              class="form-control"
              v-model="categoria"
            >
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Precio</label>

            <input
              type="number"
              class="form-control"
              v-model="precio"
            >
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Imagen URL</label>

            <input
              type="text"
              class="form-control"
              v-model="imagen"
            >
          </div>

          <div class="col-12 mb-3">
            <label class="form-label">Descripción</label>

            <textarea
              class="form-control"
              rows="3"
              v-model="descripcion"
            ></textarea>
          </div>

          <div class="col-12">
            <button
              class="btn btn-primary"
              @click="guardarProducto"
            >
              Guardar Producto
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-hover table-bordered align-middle mt-4">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="producto in productos"
          :key="producto.id"
        >
          <td>
            <img
  :src="producto.imagen"
  width="100"
  class="rounded shadow-sm"
>
          </td>

          <td>{{ producto.nombre }}</td>
          <td>{{ producto.categoria }}</td>
          <td>${{ producto.precio }}</td>
          <td>{{ producto.descripcion }}</td>

          <td>
            <button
  class="btn btn-warning btn-sm me-2"
  data-bs-toggle="modal"
  data-bs-target="#productoModal"
  @click="cargarProducto(producto)"
>
  <i class="bi bi-pencil-square"></i>
Editar
</button>

            <button
  class="btn btn-danger btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#eliminarProductoModal"
  @click="prepararEliminarProducto(producto.id)"
>
  <i class="bi bi-trash"></i>
Eliminar
</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
  class="modal fade"
  id="productoModal"
  tabindex="-1"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">
          Producto
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div class="modal-body">

  <label class="form-label">Nombre</label>

  <input
    type="text"
    class="form-control"
    v-model="nombre"
  >

  <div class="mt-3">
    <label class="form-label">Categoría</label>

    <input
      type="text"
      class="form-control"
      v-model="categoria"
    >
  </div>
<div class="mt-3">
  <label class="form-label">Precio</label>

  <input
    type="number"
    class="form-control"
    v-model="precio"
  >
</div>

<div class="mt-3">
  <label class="form-label">Imagen URL</label>

  <input
    type="text"
    class="form-control"
    v-model="imagen"
  >
</div>
<div class="mt-3">
  <label class="form-label">Descripción</label>

  <textarea
    class="form-control"
    rows="3"
    v-model="descripcion"
  ></textarea>
</div>
</div>

<div class="modal-footer">
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-dismiss="modal"
  >
    Cerrar
  </button>

  <button
    class="btn btn-primary"
    @click="guardarProducto"
  >
    Guardar Producto
  </button>
</div>

    </div>
  </div>
</div>
<div
  class="modal fade"
  id="eliminarProductoModal"
  tabindex="-1"
>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">
          Confirmar eliminación
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div class="modal-body">
        ¿Desea eliminar este producto?
      </div>

      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancelar
        </button>

        <button
  class="btn btn-danger"
  @click="eliminarProducto(idProductoEliminar)"
>
  Eliminar
</button>
      </div>

    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const productos = ref([])

const idProducto = ref(null)

const nombre = ref('')
const categoria = ref('')
const precio = ref('')
const imagen = ref('')
const descripcion = ref('')
const idProductoEliminar = ref(null)
const mensaje = ref('')
const tipoMensaje = ref('')
async function obtenerProductos() {
  try {
    const response = await api.get('/productos')
    console.log(response.data)
productos.value = response.data
  } catch (error) {
    console.error(error)
  }
}

function cargarProducto(producto) {
  console.log(producto)

  idProducto.value = producto.id
  nombre.value = producto.nombre
  categoria.value = producto.categoria
  precio.value = producto.precio
  imagen.value = producto.imagen
  descripcion.value = producto.descripcion
}
function prepararEliminarProducto(id) {
  idProductoEliminar.value = id
}
async function guardarProducto() {
  try {
    if (idProducto.value) {
  await api.put(`/productos/${idProducto.value}`, {
    nombre: nombre.value,
    categoria: categoria.value,
    precio: precio.value,
    imagen: imagen.value,
    descripcion: descripcion.value
  })

  mensaje.value = 'Producto actualizado correctamente'
  setTimeout(() => {
  mensaje.value = ''
}, 3000)
} else {
  await api.post('/productos', {
    nombre: nombre.value,
    categoria: categoria.value,
    precio: precio.value,
    imagen: imagen.value,
    descripcion: descripcion.value
  })

  mensaje.value = 'Producto creado correctamente'
  setTimeout(() => {
  mensaje.value = ''
}, 3000)
}

    idProducto.value = null

    nombre.value = ''
    categoria.value = ''
    precio.value = ''
    imagen.value = ''
    descripcion.value = ''

    obtenerProductos()
  } catch (error) {
    console.error(error)
  }
}

async function eliminarProducto(id) {
  try {
    await api.delete(`/productos/${id}`)

    mensaje.value = 'Producto eliminado correctamente'
    setTimeout(() => {
  mensaje.value = ''
}, 3000)

    obtenerProductos()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  obtenerProductos()
})
</script>