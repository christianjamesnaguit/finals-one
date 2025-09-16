<template>
  <div>
    <header>
      <h1>University of Manila</h1>
    </header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/student">Student</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/user">User</router-link>
    </nav>
    <main>
      <h2>A brief history of University of Manila</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </main>
    <footer>
      <p>University of Manila &copy; 2025</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #fff4e6;
  color: #402810;
}
header {
  background: #e86a00;
  color: #fff;
  padding: 1rem;
  text-align: center;
}
nav {
  background: #b35600;
  padding: 0.5rem;
  text-align: center;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
  color: #ffddbb;
}
main {
  padding: 2rem 0;
  text-align: center;
  max-width: 700px;
  margin: 40px auto 80px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}
footer {
  background: #e86a00;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
