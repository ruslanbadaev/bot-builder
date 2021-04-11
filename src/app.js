 window.refify
const store = require('store')
let app = new Vue({
  el: '#app',
  data: {
    permission: store.get('permission'),
    user: {first_name: 'Введите валидный токен в поле выше и ', last_name: 'примените изменения'},
    token: '',
    keys: store.get('keys'),
    help: false,
  },
  methods: {
    setToken: function() {

      store.set('token', this.token)
      fetch(`https://api.vk.com/api.php?oauth=1&method=account.getProfileInfo&v=5.67&access_token=${store.get('token')}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
        .then(json => store.set('user', json.response))
        .then(json => this.user = !!store.get('user') ? store.get('user') : {first_name: 'Введите валидный токен в поле выше и ', last_name: 'примените изменения'})
        .then(document.location.reload(true));
    },
    pushTrigger: function(i) {
      this.keys[i].triggers.length<10 ? this.keys[i].triggers.push('Привет бот'): alert('Нельзя сотворить больше триггеров');
    },
    pushAnswer: function(i) {
      this.keys[i].answers.length<10 ? this.keys[i].answers.push('Привет бот'): alert('Нельзя сотворить больше ответов');
    },
    removeTrigger: function(i, t) {
      this.keys[i].triggers.splice(t, 1);
    },
    removeAnswer: function(i, a) {
      this.keys[i].answers.splice(a, 1);
    },
    pushBlock: function() {
      this.keys.length<10 ? this.keys.push({triggers: ['Привет бот'], answers: ['Привет юзер']}): alert('Нельзя сотворить больше блоков');
    },
    removeBlock: function(i) {
      this.keys.splice(i, 1);
    },
    cancel: function() {
      document.location.reload(true);
    },
    save: function() {
      alert('Произошло сохранение \\-_-/')
      store.set('keys', this.keys)
    },
    exit: function() {
      window.close()
    },
  },
  mounted: function () {
    this.$nextTick(function () {

      !store.get('keys')?store.set('keys', [{triggers: ['Привет бот', 'hi bot'], answers: ['Привет юзер', 'hi user']}]):'';
      !store.get('token')?store.set('token', 'Введите токен'):'';
      !store.get('user')?store.set('user', {first_name: 'Введите валидный токен в поле выше и ', last_name: 'примените изменения'}):'';
      !store.get('permission')?store.set('permission', {mg0t:0, q: false}):'';
      this.keys = store.get('keys')

      store.get('keys') !== undefined ? this.keys = store.get('keys') : console.log('keys is undefined');
      this.token = store.get('token')
      store.get('user').first_name !== undefined && store.get('user').last_name !== undefined ? this.user = store.get('user') : console.log('user is undefined')

    })
  }
})
