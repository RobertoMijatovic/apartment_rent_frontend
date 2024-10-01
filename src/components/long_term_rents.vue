<template>
  <div>
    <h1>Najam stana na duže vrijeme</h1>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search apartments..." />
      <button @click="searchApartments">Search</button>
    </div>
    <div v-if="apartments.length" class="apartment-list">
      <ul>
        <li v-for="apartment in filteredApartments" :key="apartment.id" class="apartment-item">
          {{ apartment.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'LongTermRents',
  data() {
    return {
      searchQuery: '',
      apartments: [],
    };
  },
  created() {
    this.loadApartments();
  },
  methods: {
    async loadApartments() {
      try {
        const response = await axios.get('/longTermRents');
        this.apartments = response.data;
      } catch (error) {
        console.error('Error loading apartments:', error);
      }
    },
    searchApartments() {
      // Implement search functionality
    },
  },
  computed: {
    filteredApartments() {
      return this.apartments.filter(apartment =>
        apartment.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
h1 {
  color: #ffffff;
  background-color: #003366;
  display: inline-block; 
  padding: 10px; 
  border-radius: 8px; 
  color: white;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 200px;
  margin-right: 10px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #000000; 
  color: #ffffff; 
  border: 2px solid #ffffff; 
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease; 
}

.search-bar button:hover {
  background-color: #ffffff; 
  color: #000000; 
  transform: scale(1.05); 
}

.search-bar button:active {
  transform: scale(0.98); 
}

.apartment-list {
  margin-bottom: 20px;
}

.apartment-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.apartment-item h2 {
  margin: 0 0 10px;
}

.apartment-item p {
  margin: 5px 0;
}

button {
  padding: 10px 20px;
  background-color: #000000; 
  color: #ffffff; 
  border: 2px solid #ffffff; 
  border-radius: 5px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease; 
}

button:hover {
  background-color: #ffffff; 
  color: #000000; 
  transform: scale(1.05); 
}

button:active {
  transform: scale(0.98); 
}
</style>