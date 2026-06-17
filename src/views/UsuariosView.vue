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
      <i class="bi bi-people-fill"></i>
      Total Usuarios: {{ usuarios.length }}
    </h5>
  </div>
</div>
    <div class="d-flex justify-content-between align-items-center mb-3">
  <h1>
  <i class="bi bi-people-fill"></i>
  Gestión de Usuarios
</h1>

  <button
  class="btn btn-success"
  data-bs-toggle="modal"
  data-bs-target="#usuarioModal"
  @click="nuevoUsuario"
>
  <i class="bi bi-plus-circle"></i>
Nuevo Usuario
</button>
</div>
    <div
  class="card mt-3 mb-4"
  v-if="false"
>
  <div class="card-body">
    <h4>Crear Usuario</h4>

    <div class="row">
      <div class="col-md-4">
        <label class="form-label">Nombre</label>

        <input
          type="text"
          class="form-control"
          v-model="nombre"
        >
      </div>

      <div class="col-md-4">
        <label class="form-label">Usuario</label>

        <input
          type="text"
          class="form-control"
          v-model="username"
        >
      </div>

      <div class="col-md-4">
        <label class="form-label">Contraseña</label>

        <input
          type="text"
          class="form-control"
          v-model="password"
        >
            </div>
    </div>

    <div class="mt-3">
      <button
  class="btn btn-primary"
  @click="guardarUsuario"
>
  Guardar Usuario
</button>
    </div>

  </div>
</div>
   <table class="table table-hover table-bordered align-middle mt-4">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
  v-for="usuario in usuarios"
  :key="usuario.id"
>
  <td>{{ usuario.nombre }}</td>
  <td>{{ usuario.username }}</td>
  <td>{{ usuario.password }}</td>

  <td>
    <button
  class="btn btn-warning btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#usuarioModal"
  @click="cargarUsuario(usuario)"
>
  <i class="bi bi-pencil-square"></i>
Editar
</button>
<button
  class="btn btn-danger btn-sm ms-2"
  data-bs-toggle="modal"
  data-bs-target="#eliminarUsuarioModal"
  @click="prepararEliminar(usuario.id)"
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
  id="usuarioModal"
  tabindex="-1"
>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">
  {{ idUsuario ? 'Editar Usuario' : 'Crear Usuario' }}
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
    <label class="form-label">Usuario</label>

    <input
      type="text"
      class="form-control"
      v-model="username"
    >
  </div>
  <div class="mt-3">
  <label class="form-label">Contraseña</label>

  <input
    type="text"
    class="form-control"
    v-model="password"
  >
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
    @click="guardarUsuario"
  >
    Guardar Usuario
  </button>
</div>

</div>

    </div>
  </div>
</div>
<div
  class="modal fade"
  id="eliminarUsuarioModal"
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
        ¿Desea eliminar este usuario?
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
  @click="eliminarUsuario(idUsuarioEliminar)"
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

const usuarios = ref([])
const idUsuario = ref(null)
const nombre = ref('')
const username = ref('')
const password = ref('')
const idUsuarioEliminar = ref(null)
const mensaje = ref('')
const tipoMensaje = ref('')
function nuevoUsuario() {
  idUsuario.value = null

  nombre.value = ''
  username.value = ''
  password.value = ''
}
function cargarUsuario(usuario) {
  idUsuario.value = usuario.id

  nombre.value = usuario.nombre
  username.value = usuario.username
  password.value = usuario.password
}
function prepararEliminar(id) {
  idUsuarioEliminar.value = id
}
async function guardarUsuario() {
  try {
if (idUsuario.value) {
  await api.put(`/usuarios/${idUsuario.value}`, {
    nombre: nombre.value,
    username: username.value,
    password: password.value
  })

  mensaje.value = 'Usuario actualizado correctamente'
  setTimeout(() => {
  mensaje.value = ''
}, 3000)
} else {
  await api.post('/usuarios', {
    nombre: nombre.value,
    username: username.value,
    password: password.value
  })

  mensaje.value = 'Usuario creado correctamente'
  setTimeout(() => {
  mensaje.value = ''
}, 3000)
}

idUsuario.value = null

nombre.value = ''
username.value = ''
password.value = ''

obtenerUsuarios()
  } catch (error) {
    console.error(error)
  }
}
async function eliminarUsuario(id) {
  try {
    await api.delete(`/usuarios/${id}`)
    mensaje.value = 'Usuario eliminado correctamente'
    setTimeout(() => {
  mensaje.value = ''
}, 3000)
    obtenerUsuarios()
  } catch (error) {
    console.error(error)
  }
}
async function obtenerUsuarios() {
  try {
    const response = await api.get('/usuarios')
    usuarios.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  obtenerUsuarios()
})
</script>