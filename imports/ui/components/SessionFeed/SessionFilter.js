import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar'




class SessionFilter extends Component {
    constructor(){
        super()
        this.state = {
            allCourseCodes: []
        }
    }
    componentDidMount(){
       this.setState({allCourseCodes: this.props.allCourseCodes}) 

    }
    render(){
        return(
            <SearchBar
            dataSource={state.dataSource}
            onChange={(value) => setState({dataSource: [ value, value+value, value+value+value]})}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
        )
    }
}