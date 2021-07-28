import React, {Component} from 'react'
import ItemList from '../../ItemList/itemList'
import ItemDetails from '../../itemDetails/itemDetails'
import ErrorMessage from '../../errorMessage/errorMessage'
import GotService from '../../../services/script'
import Block from '../../block/block'
import { Field } from '../../itemDetails/itemDetails'


export default class CharacterPage extends Component {
    gotService = new GotService();
    state = {
        selectedCharacter: 130,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onItemSelected = (id) => {
        this.setState({
            selectedCharacter: id
        })
    }
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        } 
        const itemList = 
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender})=>`${name} (${gender})`}
            />
            
        const characterDetails = (
            <ItemDetails
                 itemId={this.state.selectedCharacter}
                 getData={this.gotService.getCharacter}> 
                <Field field='gender' label='Gender: '/>
                <Field field='born' label='Born: '/>
                <Field field='died' label='Died: '/>
                <Field field='culture' label='Culture:'/>
            </ItemDetails>
        )
        return (
                <Block listItems={itemList} item={characterDetails}/>
        )
    }
}