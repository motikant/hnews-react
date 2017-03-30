import React from 'react';
import {render} from 'react-dom';
import Grab from './extraComponent.jsx';
import NewsList from './SearchComponent.jsx';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			postIds:[],
			posts :[],
			offset:0,
			pageSize:10
		};
		this.goNext = this.goNext.bind(this);	
		this.goPrev = this.goPrev.bind(this);	
	}
	goNext(e){
		let self = this;
		this.setState((prevState)=>{
			self.getNews(prevState.offset +prevState.pageSize,prevState.pageSize);
			return{
				offset: Math.min(prevState.postIds.length , prevState.offset + prevState.pageSize)
			};
		});
	}
	goPrev(e){
		let self = this;
		this.setState((prevState)=>{
			self.getNews(prevState.offset +prevState.pageSize,prevState.pageSize);
			return{
				offset: Math.max(0 , prevState.offset - prevState.pageSize)
			};
		});
	}
	getNews(start,size){
		let self = this;
		let allNews = this.state.postIds.slice(start,start+size).map((id)=>{
			return new Grab({
				url:"https://hacker-news.firebaseio.com/v0/item/"+id+".json"
			});		
		});
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
			self.setState({
				postIds: JSON.parse(resp)
			});
			self.getNews(this.state.offset , this.state.pageSize);
		});
	}
  render () {
      return (
		  <div>
			  <p> Hacker News React! </p>
			  <div className="row">
				<div className="col-12">
					<button className="btn btn-primary m-2" onClick={this.goPrev}>Prev</button>
					<button className="btn btn-primary m-2" onClick={this.goNext}>Next</button>
				</div>
			  </div>
			  <NewsList posts={this.state.posts}/>
		  </div>
	  );
    }
}

render(<App/>, document.getElementById('app'));
