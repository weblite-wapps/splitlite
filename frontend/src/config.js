export default process.env.NODE_ENV === 'development' ? {
  server: 'https://localhost:4150',
} : {
  server: 'https://wapp.weblite.me/splitlite',
}
