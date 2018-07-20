export default process.env.NODE_ENV === 'development' ? {
  server: 'https://localhost:3092',
} : {
  server: 'https://weblite.me:3092',
}
