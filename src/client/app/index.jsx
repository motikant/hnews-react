import React from 'react';
import {render} from 'react-dom';
import Grab from './extraComponent.jsx';
import FetchNews from './FetchNews.jsx';
import NewsList from './SearchComponent.jsx';

const initialState = {
			postIds:[],
			posts :[],
			offset:0,
			pageSize:10,
			prevDisabled:'disabled',
			nextDisabled:'disabled'
		};

const reducer = (state = initialState,type) =>{
	let nextOffset;
	switch(type){
		case 'GO_NEXT':
			nextOffset = Math.min(state.postIds.length , state.offset + state.pageSize) ;
			if(nextOffset < state.postIds.length){
				self.getNews(nextOffset,state.pageSize);
			}
			return Object.assign({},state,{
				offset : nextOffset
			});
		case 'GO_PREV':
			nextOffset =Math.max(0 , state.offset - state.pageSize) ;
			if(nextOffset >= 0){
				self.getNews(nextOffset,state.pageSize);
			}
			return Object.assign({},state,{
				offset : nextOffset
			});
		default:
			return state;
	}
};

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = reducer();
		this.goNext = this.goNext.bind(this);	
		this.goPrev = this.goPrev.bind(this);	
	}
	goNext(e){
		this.setState((prevState)=>{
			return reducer(prevState,'GO_NEXT');
		});
	}
	goPrev(e){
		this.setState((prevState)=>{
			return reducer(prevState,'GO_PREV');
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
			let prevDisabled = self.state.offset - self.state.pageSize < 0 ? 'disabled' : '';
			let nextDisabled = self.state.offset + self.state.pageSize >=  self.state.postIds.length ? 'disabled' : '';
			self.setState({
				posts:results,
				prevDisabled:prevDisabled,
				nextDisabled:nextDisabled
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
						<button className={"btn btn-primary m-2 "+this.state.prevDisabled} onClick={this.goPrev}>Prev</button>
						<button className={"btn btn-primary m-2 "+this.state.nextDisabled} onClick={this.goNext}>Next</button>
					</div>
				</div>
				<NewsList posts={this.state.posts}/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));
