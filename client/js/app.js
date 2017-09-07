const API = 'http://localhost:3000/api/cats/';

let catApp = new Vue({
	el:'#catApp',
	data:{
		cats:[],
		cat:{
			id:'',
			name:'',
			age:'',
			gender:'',
			breed:''
		}
	},
	created:function() {
		this.getCats();
	},
	methods:{
		getCats:function() {
			fetch(API)
			.then(res => res.json())
			.then(res => this.cats = res);	
		},
		storeCat:function() {
			let method;
			console.log('storeCat', this.cat);
			// Handle new vs old
			if(this.cat.id === '') {
				delete this.cat.id;
				method = 'POST';
			} else {
				method = 'PUT';
			}
			fetch(API, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
				body:JSON.stringify(this.cat)
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
				this.reset();
			});
		},
		deleteCat:function(c) {
			fetch(API + c.id, {
				headers:{
					'Content-Type':'application/json'
				},
				method:'DELETE'
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
			});

			// call reset cuz the cat could be 'active'
			this.reset();
		},
		editCat:function(c) {
			/*
			This line was bad as it made a reference, and as you typed, it updated
			the list. A user may think they don't need to click save.
			this.cat = c;
			*/
			this.cat.id = c.id;
			this.cat.name = c.name;
			this.cat.age = c.age;
			this.cat.breed = c.breed;
			this.cat.gender = c.gender;
		},
		reset:function() {
			this.cat.id = '';
			this.cat.name = '';
			this.cat.age = '';
			this.cat.breed = '';
			this.cat.gender = '';
		}
	}
});