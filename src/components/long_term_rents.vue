<template>
  <div class="container">
    <h1>Najam stana na duže vrijeme</h1>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search apartments..."
      />
      <button @click="searchApartments">Search</button>
    </div>

    <form
      v-if="canCreate"
      @submit.prevent="createApartment"
      class="apartment-form"
    >
      <h2>Dodaj novi stan</h2>
      <input v-model="newApartment.name" placeholder="Name" required />
      <input v-model="newApartment.address" placeholder="Address" required />
      <textarea
        v-model="newApartment.description"
        placeholder="Description"
        required
      ></textarea>
      <input
        v-model.number="newApartment.price"
        type="number"
        placeholder="Price"
        required
      />
      <select v-model="newApartment.status">
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
      <button type="submit">Add Apartment</button>
    </form>

    <div v-if="filteredApartments.length">
      <ul class="apartment-list">
        <li
          v-for="apartment in filteredApartments"
          :key="apartment.id"
          class="apartment-item"
        >
          <h2>{{ apartment.name }}</h2>
          <p><strong>Address:</strong> {{ apartment.address }}</p>
          <p><strong>Description:</strong> {{ apartment.description }}</p>
          <p><strong>Price:</strong> ${{ apartment.price }}</p>
          <p><strong>Status:</strong> {{ apartment.status }}</p>
          <button
            v-if="canDelete"
            @click="deleteApartment(apartment.id)"
            class="delete-button"
          >
            Delete
          </button>
          <button
            v-if="canEdit"
            @click="openEditModal(apartment)"
            class="edit-button"
          >
            Edit
          </button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No apartments found.</p>
    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit Apartment</h2>
        <form @submit.prevent="updateApartment" class="apartment-form">
          <input v-model="editingApartment.name" placeholder="Name" required />
          <input
            v-model="editingApartment.address"
            placeholder="Address"
            required
          />
          <textarea
            v-model="editingApartment.description"
            placeholder="Description"
            required
          ></textarea>
          <input
            v-model.number="editingApartment.price"
            type="number"
            placeholder="Price"
            required
          />
          <select v-model="editingApartment.status">
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button type="submit">Update Apartment</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "DailyRents",
  data() {
    return {
      searchQuery: "",
      apartments: [],
      newApartment: {
        name: "",
        address: "",
        description: "",
        price: null,
        status: "available",
      },
      editingApartment: null,
      isModalOpen: false,
      userRole: 3, 
    };
  },
  computed: {
    filteredApartments() {
      return this.apartments.filter(
        (apartment) =>
          apartment.name &&
          apartment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    canCreate() {
      return this.userRole === 1 || this.userRole === 2;
    },
    canEdit() {
      return this.userRole === 1 || this.userRole === 2;
    },
    canDelete() {
      return this.userRole === 1;
    },
  },
  created() {
    this.loadApartments();
    this.getUserRole(); 
  },
  methods: {
    async loadApartments() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        await axios.get("/longTermRents").then((response) => {
          this.apartments = response.data.response || [];
        });
      } catch (error) {
        console.error("Error loading apartments:", error);
      }
    },
    async createApartment() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        await axios.post("/longTermRent", this.newApartment);
        await this.loadApartments();
        this.resetForm();
      } catch (error) {
        console.error("Error creating apartment:", error);
      }
    },
    async deleteApartment(id) {
      const confirmed = confirm("Are you sure you want to delete this apartment?");
      if (!confirmed) return;

      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        await axios.delete(`/longTermRent/${id}`);
        await this.loadApartments();
      } catch (error) {
        console.error("Error deleting apartment:", error);
      }
    },
    openEditModal(apartment) {
      this.editingApartment = { ...apartment };
      this.isModalOpen = true;
    },
    async updateApartment() {
      const confirmed = confirm("Are you sure you want to update this apartment?");
      if (!confirmed) return;

      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        await axios.put(`/longTermRent`, this.editingApartment);
        await this.loadApartments();
        this.closeModal();
      } catch (error) {
        console.error("Error updating apartment:", error);
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.editingApartment = null;
    },
    resetForm() {
      this.newApartment = {
        name: "",
        address: "",
        description: "",
        price: null,
        status: "available",
      };
    },
    getUserRole() {
      const role = localStorage.getItem("role");
      this.userRole = role ? parseInt(role) : 3;
    },
    searchApartments() {
     
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #ffffff;
  background-color: #003366;
  display: inline-block;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.search-bar input {
  padding: 10px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #003366;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #0055a5;
}

.apartment-form {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.apartment-form h2 {
  margin-bottom: 15px;
}

.apartment-form input,
.apartment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.apartment-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.apartment-form button {
  padding: 10px 20px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.apartment-form button:hover {
  background-color: #218838;
}

.apartment-list {
  margin-bottom: 20px;
}

.apartment-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.apartment-item h2 {
  margin: 0 0 10px;
}

.apartment-item p {
  margin: 5px 0;
}

.delete-button {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.close {
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
</style>
