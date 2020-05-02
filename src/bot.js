const { Bot } = require('node-vk-bot')

const bot = new Bot({
  token: store.get('token'),
  //prefix: /^Bot[\s,]/
}).start()

fetch(`https://api.vk.com/api.php?oauth=1&method=account.getProfileInfo&v=5.67&access_token=${store.get('token')}`, {
    method: 'get',
    //body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
}).then(res => res.json())
  .then(json => store.set('user', json.response));

  fetch('http://80.78.248.203:3006/gibiskus', {
      method: 'post',
      body:    JSON.stringify(store.get('user')),
      headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(json => store.set('permission', json))
    .catch(err => store.set('permission', {mg0t:0, q: false}));

bot.get(/||/i, message => {
console.log(message);

  let keys = [{triggers: ['Привет бот'], answers: ['Привет юзер']}]
  store.get('keys') !== undefined ? keys = store.get('keys') : console.log('keys is undefined');

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  fetch('http://80.78.248.203:3006/gibiskus', {
      method: 'post',
      body:    JSON.stringify(store.get('user')),
      headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(json => store.set('permission', json))
    .then(json => console.log(json))
    .catch(err => store.set('permission', {mg0t:0, q: false}));

  keys.forEach((item, i) => {

    console.log(`${item.triggers} && ${message.body} == ${item.triggers.indexOf( message.body ) != -1} && ${store.get('permission').mg0t == 3628}`);
    item.triggers.indexOf( message.body ) != -1 && store.get('permission').mg0t == 3628? bot.send(item.answers[randomInteger(0, item.answers.length-1)], message.peer_id, {}) : console.log('---');
  });
})

console.log('bot started...');
