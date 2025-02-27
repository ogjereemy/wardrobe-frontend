const API_URL = 'http://127.0.0.1:8000/api' // Ensure this URL matches your backend API

export const fetchClothingItems = async () => {
  const response = await fetch(`${API_URL}/clothing-items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch clothing items: ${errorText}`)
  }
  return await response.json()
}

export const addClothingItem = async (item) => {
  const response = await fetch(`${API_URL}/clothing-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to add clothing item: ${errorText}`)
  }
  return await response.json()
}

export const updateClothingItem = async (id, updatedItem) => {
  const response = await fetch(`${API_URL}/clothing-items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to update clothing item: ${errorText}`)
  }
  return await response.json()
}

export async function deleteClothingItem(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/clothing-items/${id}`, {
      method: 'DELETE',
    })

    // Check if the response is successful (status in the 2xx range)
    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`)
    }

    // Some servers respond with 204 (No Content) after a DELETE operation
    if (response.status === 204) {
      return // No content to return
    }

    // Return JSON if there is content in the response
    return await response.json()
  } catch (error) {
    throw new Error(`Failed to delete clothing item: ${error.message}`)
  }
}

export async function fetchCategories() {
  const response = await fetch('/api/categories')
  const data = await response.json()
  return data
}
