<template>
  <div class="container clothing-items-container">
    <h1 class="text-center my-4">Clothing Items</h1>

    <!-- Search and Filter Section -->
    <div class="row mb-4">
      <div class="col-md-6">
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="Search items..."
        />
      </div>
      <div class="col-md-6">
        <select v-model="selectedCategory" class="form-select">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Add Item Button -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="showAddItemForm = true">Add Item</button>
    </div>

    <!-- Add Item Form -->
    <div v-if="showAddItemForm" class="card card-body mb-4">
      <h2 class="card-title">Add Item</h2>
      <form @submit.prevent="addItem">
        <div class="mb-3">
          <input
            v-model="newItem.name"
            type="text"
            class="form-control"
            placeholder="Item Name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="newItem.description"
            type="text"
            class="form-control"
            placeholder="Description"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="newItem.size"
            type="text"
            class="form-control"
            placeholder="Size"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="newItem.color"
            type="text"
            class="form-control"
            placeholder="Color"
            required
          />
        </div>
        <div class="mb-3">
          <select v-model="newItem.category_id" class="form-select" required>
            <option value="" disabled>Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success me-2">Add</button>
          <button type="button" class="btn btn-secondary" @click="showAddItemForm = false">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Items Table -->
    <table class="table table-hover table-bordered">
      <thead class="table-light">
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
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="editItem(item)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Item Form -->
    <div v-if="showEditItemForm" class="card card-body mb-4">
      <h2 class="card-title">Edit Item</h2>
      <form @submit.prevent="updateItem">
        <div class="mb-3">
          <input
            v-model="currentItem.name"
            type="text"
            class="form-control"
            placeholder="Item Name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="currentItem.description"
            type="text"
            class="form-control"
            placeholder="Description"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="currentItem.size"
            type="text"
            class="form-control"
            placeholder="Size"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="currentItem.color"
            type="text"
            class="form-control"
            placeholder="Color"
            required
          />
        </div>
        <div class="mb-3">
          <select v-model="currentItem.category_id" class="form-select">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success me-2">Update</button>
          <button type="button" class="btn btn-secondary" @click="showEditItemForm = false">
            Cancel
          </button>
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
/* Add custom styles if necessary */
</style>
