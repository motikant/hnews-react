import React from 'react';
import {render} from 'react-dom';
import Grab from './extraComponent.jsx';
import NewsList from './SearchComponent.jsx';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			posts :[]
		};
		
	}
	getNews(ids = []){
		let self = this;
		let allNews = ids.slice(0,10).map((id)=>{
			return new Grab({
				url:"https://hacker-news.firebaseio.com/v0/item/"+id+".json"
			});		
		});
			console.log(allNews);
		Promise.all(allNews).then((results)=>{
			results = results.map((a)=>JSON.parse(a));
			self.setState({
				posts:results
			});
		});
	}
	componentDidMount(){
		let latest = new Grab({
			url:"https://hacker-news.firebaseio.com/v0/topstories.json",
		});
		let self = this;
		latest.then((resp)=>{
			self.getNews(JSON.parse(resp));
		});
	}
  render () {
      return (
		  <div>
		  <p> Hacker News React! </p>
		  <NewsList posts={this.state.posts}/>
		  </div>
	  );
    }
}

render(<App/>, document.getElementById('app'));
