<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">TechStore</h2>

            <div
              v-if="mensaje"
              :class="claseAlerta"
              class="alert"
            >
              {{ mensaje }}
            </div>

            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="username"
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                >
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
              >
                Iniciar Sesión
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const username = ref('')
const password = ref('')
const mensaje = ref('')
const claseAlerta = ref('')

async function login() {
  try {
    const response = await api.get('/usuarios')

    const usuarioEncontrado = response.data.find(
      usuario =>
        usuario.username === username.value &&
        usuario.password === password.value
    )

    if (usuarioEncontrado) {
      localStorage.setItem('token', 'usuario-autenticado')
      localStorage.setItem('usuario', usuarioEncontrado.username)

      mensaje.value = 'Inicio de sesión correcto'
      claseAlerta.value = 'alert-success'

      setTimeout(() => {
        router.push('/productos')
      }, 1000)
    } else {
      mensaje.value = 'Usuario o contraseña incorrectos'
      claseAlerta.value = 'alert-danger'
    }
  } catch (error) {
    mensaje.value = 'Error al conectar con el servidor'
    claseAlerta.value = 'alert-danger'
    console.error(error)
  }
}
</script>