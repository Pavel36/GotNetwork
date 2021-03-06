import React, {Component} from 'react'
import ItemList from '../../ItemList/itemList'
import ErrorMessage from '../../errorMessage/errorMessage'
import GotService from '../../../services/script'
import { withRouter } from 'react-router'


class BookPage extends Component {
    gotService = new GotService();
    state = {
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        } 
        
        return (
            <ItemList 
                onItemSelected={(itemId)=>{
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, publisher})=>`${name} (${publisher})`}
            />
        )
    }
}

export default withRouter(BookPage)