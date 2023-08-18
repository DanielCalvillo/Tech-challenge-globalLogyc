const url = 'http://localhost:1234/api'

async function getMovies() {
  try {
    const raw = await fetch(`${url}/movies.json`)
    const parsedResponse = await raw.json()
    return parsedResponse
  } catch (e) {
      throw e
  }
}

async function getReviews() {
  try {
    const raw = await fetch(`${url}/reviews.json`)
    const parsedResponse = await raw.json()
    return parsedResponse
  } catch (e) {
      throw e
  }
}

export default {
  getMovies,
  getReviews
}
