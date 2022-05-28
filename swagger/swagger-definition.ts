export default {
  openapi: '3.0.0',
  info: {
    title: 'HTEC',
    version: '1.0.0',
    description:
      'HTEC Trello server'
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Trello server'
    }
  ]
}
