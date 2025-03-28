const API_URL = 'https://wardrobe-backend-7q8o.onrender.com/api' // Ensure this URL matches your backend API

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
    const response = await fetch(`${API_URL}/clothing-items/${id}`, {
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
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch categories: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error // rethrow to propagate the error
  }
}
