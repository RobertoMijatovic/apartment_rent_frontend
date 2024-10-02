<template>
  <div class="login-page">
    <div class="form-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
  ...mapActions(['setToken']),
  async login() {
    try {
      const response = await axios.post('/login', {
        email: this.email,
        password: this.password,
      });
      const { token, role } = response.data; // Ensure backend response includes token and role
      this.setToken(token); // Store the token in Vuex
      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Login successful:', response.data);
      // Navigate based on role
      if (role === 1) {
        this.$router.push({ name: 'admin_dashboard' });
      } else if (role === 2) {
        this.$router.push({ name: 'moderator_dashboard' });
      } else {
        this.$router.push({ name: 'user_dashboard' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  },
}

};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px; 
  background-image: url('@/assets/stanovi.jpg');
  background-size: cover;
  background-position: center;
}

.form-container {
  width: 100%; 
  max-width: 450px; 
  padding: 20px;
  background-color: rgba(245, 245, 245, 0.9); 
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #003366;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0055a5;
}

.register-link {
  text-align: center;
  margin-top: 10px;
}

.register-link a {
  color: #003366;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>