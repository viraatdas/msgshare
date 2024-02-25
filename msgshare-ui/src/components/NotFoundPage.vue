<template>
    <div class="not-found-container">
      <h1 class="not-found-title">Oops!</h1>
      <p class="not-found-subtitle">We can't seem to find the page you're looking for.</p>
      <div class="not-found-illustration">
        <!-- You can add an SVG or an image here for a visual touch -->
        <img src="@/assets/404.png" alt="Page Not Found" />
      </div>
      <ul class="not-found-links">
        <li><router-link to="/">Go Home</router-link></li>
      </ul>
    </div>
  </template>
  
<script>
    export default {
        name: 'NotFound',
    };
</script>
  
<style scoped>
    .not-found-container {
    display: flex; /* Use Flexbox */
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center align items horizontally */
    justify-content: center; /* Center items vertically */
    text-align: center;
    padding: 50px;
    min-height: 100vh; /* Make container take at least the full height of the viewport */
    box-sizing: border-box; /* Include padding in the element's total height */
    }

    .not-found-title {
    font-size: 2.5em;
    color: #2c3e50;
    margin: 0.5em 0; /* Adjusted for visual spacing */
    }

    .not-found-subtitle {
    font-size: 1.5em;
    margin: 20px 0;
    }

    .not-found-illustration img {
    max-width: 100%;
    height: auto;
    margin: 30px 0;
    }

    .not-found-links {
    list-style: none;
    padding: 0;
    display: flex; /* Align links side by side */
    flex-direction: column; /* Stack them vertically for better mobile responsiveness */
    gap: 10px; /* Provide some space between links */
    }

    .not-found-links a {
    text-decoration: none;
    color: #3498db;
    background-color: #f2f2f2; /* Optional: adds background color */
    padding: 10px 20px; /* Optional: adds padding */
    border-radius: 5px; /* Optional: rounds the corners */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
    }

    .not-found-links a:hover {
    text-decoration: underline;
    background-color: #e2e2e2; /* Slightly darker on hover */
    }

</style>

