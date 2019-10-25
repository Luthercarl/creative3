let app = new Vue({
  el: '#app',
  data: {
	message: 'hello world',
    number: '',
	moviename: 'uhf',
	max: '',
    current: {
      Title: '',
	  Year: '',
	  Genre: '',
      Poster: '',
      Plot: ''
    },
	loading: true,
	addedName: '',
	addedComment: '',
	comments: {},
  },
  created() {
    this.xkcd();
  },
  methods: {
    xkcd() {
		this.loading = true;	
      axios.get('https://omdbapi.com/?t=' + this.moviename + '&apikey=a9b03d7e')
        .then(response => {
		
			this.current = response.data;
			this.loading = false;
			return true;

        })
        .catch(error => {
          console.log(error)
		  this.number = this.max;
        });
    },
	addComment() {
      if (!(this.moviename in this.comments))
        Vue.set(app.comments, this.moviename, new Array);
      this.comments[this.moviename].push({
        author: this.addedName,
        text: this.addedComment
      });
      this.addedName = '';
      this.addedComment = '';
    },
	getRandom(min, max){
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1))+min;
	},
	findMovie(){
		this.moviename = document.getElementById("movieinput").value;
	},
	randomComic(){
	
		this.number = this.getRandom(1, this.max);
	
	},
	previousComic() {
	  this.number = this.current.num -1;
	  if(this.number < 1)
		  this.number = 1;
	},
	nextComic() {
	  this.number = this.current.num +1;
	  if(this.number > this.max)
		  this.number = this.max
	},
  },
  computed: {
    month() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
	  number(value, oldvalue){
		  if(oldvalue === ''){
			  this.max = value
		  } else {
			  this.xkcd();
		  }
	  },
	  moviename(value, oldvalue){
		  this.xkcd();
	  },
  },

});