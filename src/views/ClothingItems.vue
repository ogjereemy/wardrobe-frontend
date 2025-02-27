<template>
  <div class="clothing-items-container">
    <h1>Clothing Items</h1>
    <!-- Search and filter section -->
    <div class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Search items..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.name">
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
        <select v-model="newItem.category_id">
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
          <td>{{ item.category.name }}</td>
          <td>
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
        <button type="submit">Update</button>
        <button type="button" @click="showEditItemForm = false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
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
        filtered = filtered.filter((item) => item.category.name === this.selectedCategory)
      }

      return filtered
    },
  },
  methods: {
    fetchItems() {
      // Replace with API call to fetch items from the backend
      // For example:
      // axios.get('/api/items').then(response => {
      //   this.items = response.data;
      // });

      this.items = [
        // Sample data
        {
          id: 1,
          name: 'Shirt',
          description: 'Blue Shirt',
          size: 'M',
          color: 'Blue',
          category: { id: 1, name: 'Tops' },
        },
        {
          id: 2,
          name: 'Jeans',
          description: 'Black Jeans',
          size: '32',
          color: 'Black',
          category: { id: 2, name: 'Bottoms' },
        },
      ]
    },
    fetchCategories() {
      // Replace with API call to fetch categories from the backend
      // For example:
      // axios.get('/api/categories').then(response => {
      //   this.categories = response.data;
      // });

      this.categories = [
        { id: 1, name: 'Tops' },
        { id: 2, name: 'Bottoms' },
      ]
    },
    addItem() {
      // Replace with API call to add new item
      // For example:
      // axios.post('/api/items', this.newItem).then(response => {
      //   this.items.push(response.data);
      // });

      const newItem = {
        ...this.newItem,
        id: Date.now(),
        category: this.categories.find((cat) => cat.id === this.newItem.category_id),
      }
      this.items.push(newItem)
      this.resetNewItemForm()
    },
    editItem(item) {
      this.currentItem = { ...item }
      this.showEditItemForm = true
    },
    updateItem() {
      // Replace with API call to update item
      // For example:
      // axios.put(`/api/items/${this.currentItem.id}`, this.currentItem).then(response => {
      //   const index = this.items.findIndex(i => i.id === this.currentItem.id);
      //   this.items.splice(index, 1, response.data);
      // });

      const index = this.items.findIndex((i) => i.id === this.currentItem.id)
      this.items.splice(index, 1, this.currentItem)
      this.showEditItemForm = false
    },
    deleteItem(id) {
      // Replace with API call to delete item
      // For example:
      // axios.delete(`/api/items/${id}`).then(() => {
      //   this.items = this.items.filter(i => i.id !== id);
      // });

      this.items = this.items.filter((i) => i.id !== id)
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
}

.form-section {
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
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

button {
  background-color: #007bff;
  color: black;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
