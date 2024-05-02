import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchAllMovies = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/movies?page=${page}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};


export const fetchSeries = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/movies?page=${page}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchFeatureFilms = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/movies/feature-films?page=${page}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
export const fetchTVShows = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/movies/tv-shows?page=${page}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAnimated = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/movies/animated?page=${page}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const detailFilm = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/movies/detail/${slug}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};