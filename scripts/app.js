const vue = new Vue({
  el: '#app',
  data: {
    header: 'shopping list app',
    defaultPrefix: ';',
    commands: [
      {
        name: 'help',
        description: 'Return\'s a list of all available commands for the current server.',
        usage: ';help',
        aliases: 'None'
      }
    ]
  },
  computed: {
    getCommands() {
      return this.commands
    }
  },
  methods: {}
})
