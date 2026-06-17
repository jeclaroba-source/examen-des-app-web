<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container">
      <router-link to="/login" class="navbar-brand">
        TechStore
      </router-link>

      <div class="navbar-nav me-auto">
        <router-link to="/login" class="nav-link">
          Login
        </router-link>

        <router-link to="/productos" class="nav-link">
          Productos
        </router-link>

        <router-link to="/usuarios" class="nav-link">
          Usuarios
        </router-link>
        </div>

<div>
  <button
    class="btn btn-outline-light btn-sm"
    @click="cerrarSesion"
  >
    Cerrar Sesión
  </button>
</div>
    </div>
  </nav>

  <router-view />
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function cerrarSesion() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>