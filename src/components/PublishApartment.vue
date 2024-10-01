<template>
    <div class="form-container">
      <h1>Objavi svoju nekretninu</h1>
      <form @submit.prevent="publish">
        <input type="text" v-model="title" placeholder="title" required />
        <textarea v-model="description" placeholder="Description" required></textarea>
        <input type="number" v-model="price" placeholder="Price" required />
        <input type="text" v-model="publisher" placeholder="Publisher" required />
        <select v-model="localCategory" required>
          <option value="market">Prodaj</option>
          <option value="rent-daily">iznajmi na dan</option>
          <option value="rent-long-term">iznajmi na duže vrijeme</option>
        </select>
        <button type="submit">Objavi</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PublishApartment',
    props: {
      category: {
        type: String,
        required: true
      }
    }
}
  </script>
  
  <style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000407;
  margin-top: 60px;
  width: 100vw; 
  height: 100vh; 
  margin: 0; 
  background-image: url('@/assets/stanovi.jpg');
  background-size: 100% 100%;  
  background-position: center; 
  background-repeat: no-repeat; 
}
  
  
  h1 {
    color: #42b983;
    text-align: center;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .message {
    color: green;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>