const app = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@myemail.com',
      gender: 'male',
      picture: 'https://randomuser.me/api/portraits/men/75.jpg',
      joke: 'Who Am I? I can be anybody - Rango'
    };
  },
  methods: {
    async getUser() {
      
        const [resultsResponse, jokeResponse] = await Promise.all([
        fetch('https://randomuser.me/api'),
        fetch('https://api.chucknorris.io/jokes/random'),
      ]);

      const resultsData = await resultsResponse.json();
      const jokeData = await jokeResponse.json();

      if (resultsResponse.ok && jokeResponse.ok) {
        this.firstName = resultsData.results[0].name.first;
        this.lastName = resultsData.results[0].name.last;
        this.email = resultsData.results[0].email;
        this.gender = resultsData.results[0].gender;
        this.picture = resultsData.results[0].picture.large;
        this.joke = jokeData.value;
      } else {
        console.log('Error');
      }
      console.log(resultsResponse);
      console.log(jokeData);

      
    },

    async getJokes(){
      const res = await fetch('https://api.chucknorris.io/jokes/random');
      const joke  = await res.json();
      
      console.log(joke.value);
      this.joke = joke.value;
    
    }
  },
});

app.mount('#app');
