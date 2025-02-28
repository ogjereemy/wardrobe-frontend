<template>
  <div class="clothing-items-container">
    <h1>Clothing Items</h1>
    <!-- Search and filter section -->
    <div class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Search items..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Add Item Button -->
    <div>
      <button @click="showAddItemForm = true">Add Item</button>
    </div>

    <!-- Add Item Form -->
    <div v-if="showAddItemForm" class="form-section">
      <h2>Add Item</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" type="text" placeholder="Item Name" required />
        <input v-model="newItem.description" type="text" placeholder="Description" required />
        <input v-model="newItem.size" type="text" placeholder="Size" required />
        <input v-model="newItem.color" type="text" placeholder="Color" required />
        <select v-model="newItem.category_id" required>
          <option value="" disabled>Select Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button type="submit">Add</button>
        <button type="button" @click="showAddItemForm = false">Cancel</button>
      </form>
    </div>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Size</th>
          <th>Color</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.size }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.category ? item.category.name : 'Unknown' }}</td>
          <td class="action-buttons">
            <button @click="editItem(item)">Edit</button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Item Form -->
    <div v-if="showEditItemForm" class="form-section">
      <h2>Edit Item</h2>
      <form @submit.prevent="updateItem">
        <input v-model="currentItem.name" type="text" placeholder="Item Name" required />
        <input v-model="currentItem.description" type="text" placeholder="Description" required />
        <input v-model="currentItem.size" type="text" placeholder="Size" required />
        <input v-model="currentItem.color" type="text" placeholder="Color" required />
        <select v-model="currentItem.category_id">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <div class="form-buttons">
          <button type="submit">Update</button>
          <button type="button" @click="showEditItemForm = false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  addClothingItem,
  deleteClothingItem,
  updateClothingItem,
  fetchCategories,
  fetchClothingItems,
} from '@/services/clothingService'

export default {
  data() {
    return {
      items: [], // All items
      categories: [], // Available categories
      searchQuery: '',
      selectedCategory: '',
      showAddItemForm: false,
      showEditItemForm: false,
      newItem: {
        name: '',
        description: '',
        size: '',
        color: '',
        category_id: null,
      },
      currentItem: null, // Item being edited
    }
  },
  computed: {
    filteredItems() {
      let filtered = this.items
      console.log('Items before filtering:', filtered)

      if (!Array.isArray(filtered)) {
        console.error('Items is not an array:', filtered)
        return []
      }

      if (this.searchQuery) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(
          (item) => item.category && item.category.id === this.selectedCategory,
        )
      }

      return filtered
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await fetchClothingItems()
        if (response && Array.isArray(response.data)) {
          this.items = response.data // Assign the actual items array
        } else {
          console.error('Fetched data is not an array:', response)
          this.items = [] // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching items:', error)
        this.items = [] // Fallback to an empty array in case of error
      }
    },
    async fetchCategories() {
      try {
        const data = await fetchCategories()
        this.categories = data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async addItem() {
      try {
        await addClothingItem(this.newItem) // Just add the item
        this.resetNewItemForm()
        await this.fetchItems() // Re-fetch all items to ensure the UI is updated
      } catch (error) {
        console.error('Error adding item:', error)
      }
    },
    editItem(item) {
      this.currentItem = { ...item }
      this.showEditItemForm = true
    },
    async updateItem() {
      try {
        const updatedItem = await updateClothingItem(this.currentItem.id, this.currentItem)
        const index = this.items.findIndex((i) => i.id === this.currentItem.id)
        updatedItem.category = this.categories.find(
          (category) => category.id === updatedItem.category_id,
        )
        this.items.splice(index, 1, updatedItem)
        this.showEditItemForm = false
      } catch (error) {
        console.error('Error updating item:', error)
      }
    },
    async deleteItem(id) {
      try {
        await deleteClothingItem(id)
        this.items = this.items.filter((i) => i.id !== id)
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    },
    resetNewItemForm() {
      this.newItem = {
        name: '',
        description: '',
        size: '',
        color: '',
        category_id: null,
      }
      this.showAddItemForm = false
    },
  },
  mounted() {
    this.fetchItems()
    this.fetchCategories()
  },
}
</script>

<style scoped>
.clothing-items-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input,
.search-filter select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;
}

.add-item-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.form-section {
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-top: 0;
}

.form-section form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-section input,
.form-section select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  color: #0056b3;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
