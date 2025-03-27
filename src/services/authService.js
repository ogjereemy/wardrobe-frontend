const API_URL = 'https://wardrobe-backend-7q8o.onrender.com/api' // Ensure this URL matches your backend API

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const contentType = response.headers.get('content-type')
    let responseBody
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json()
    } else {
      const errorText = await response.text()
      throw new Error(`Unexpected error format: ${errorText}`)
    }
    if (!response.ok) {
      throw new Error('Login failed: ' + (responseBody.message || 'Unknown error'))
    }

    // Return the success message and token data
    return {
      successMessage: responseBody.message, // Capture the success message
      token: responseBody.token, // Capture the token
    }
  } catch (error) {
    console.error('Login error:', error.message)
    throw new Error(`Login error: ${error.message}`)
  }
}

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    const contentType = response.headers.get('content-type')
    let responseBody
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json()
    } else {
      const errorText = await response.text()
      throw new Error(`Unexpected error format: ${errorText}`)
    }
    if (!response.ok) {
      throw new Error('Registration failed: ' + (responseBody.message || 'Unknown error'))
    }
    return responseBody
  } catch (error) {
    console.error('Registration error:', error.message)
    throw new Error(`Registration error: ${error.message}`)
  }
}
