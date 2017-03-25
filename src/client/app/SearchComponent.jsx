import React from 'react';

class SearchComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : '',
            sortBy : 'score',
            sortOrder: -1
        };
    }
    render(){
        return (
            <div className="row">
                <div className="col-4">
                    <input id="search"  type="text" placeholder="Search By Name"/>
                </div>
                <div className="col-4">
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort">
                        <option value="-1">Highest to Lowest (Score)</option>            
                        <option value="1">Lowest to Highest (Score)</option>
                    </select>
                </div>            
                <div className="col-4">
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>            
        );
    }
}

export default SearchComponent;
