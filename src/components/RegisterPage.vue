<template>
  <div class="register-page">
    <div class="form-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { mapActions } from 'vuex';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setToken']),
    async register() {
      console.log('Register button clicked');
      try {
        const response = await axios.post('/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log('Registration successful:', response.data);
        const { token } = response.data;
        this.setToken(token); // Store the token in Vuex
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in Axios headers
        this.$router.push('/login'); // Redirect to login page
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
  },
};
</script>

<style scoped>
.register-page {
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

.login-link {
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  color: #003366;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>