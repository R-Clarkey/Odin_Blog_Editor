const API_URL = import.meta.env.VITE_API_URL
/**
 * @param {string} endpoint
 * @param {RequestInit} options method and body 
 * @returns {Promise<any>}
 */
export async function apiConnect(endpoint, options = {}) {
    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, 
    {...options, headers}
    )

    const data = await response.json().catch(() => null)
    console.log(response, "Response")

    if (!response.ok) {
        throw new Error(data?.message || `Request failed (${response.status})`)
    }

    return data
}