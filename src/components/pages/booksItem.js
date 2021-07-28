import React, {Component} from 'react'
import GotService from '../../services/script';
import ItemDetails, {Field} from '../itemDetails/itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return (
            <ItemDetails 
            itemId={this.props.bookId}
            getData={this.gotService.getBook}> 
                <Field field='numberOfPages' label='Pages: '/>
                <Field field='publisher' label='Publisher: '/>
                <Field field='released' label='Released:'/>
            </ItemDetails>
        )
    }
}