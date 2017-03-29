import React from 'react';

class News extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
		let date = (new Date(this.props.post.time)).toLocaleDateString();
        return (
            <div className="row">
				<div className="col-12 p-2">
					<div><a href={this.props.post.url}>{this.props.post.title}</a></div>
					<div>By : {this.props.post.by}</div>
					<div>Points : {this.props.post.score}</div>
					<div>When : {date}</div>
				</div>
            </div>            
        );
    }
}

class NewsList extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row">
				<div className="col-12">
					{this.props.posts.map((post)=><News key={post.id} post={post}/>)}
				</div>
			</div>
		);
	}
}

export default NewsList;
