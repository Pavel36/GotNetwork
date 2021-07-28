import React, {Component} from 'react'
import ItemList from '../../ItemList/itemList'
import ItemDetails from '../../itemDetails/itemDetails'
import ErrorMessage from '../../errorMessage/errorMessage'
import GotService from '../../../services/script'
import Block from '../../block/block'
import { Field } from '../../itemDetails/itemDetails'


export default class HousePage extends Component {
    gotService = new GotService();
    state = {
        selectedHouse: 130,
        error: false
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        } 
        const itemList = <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={({name, region})=>`${name} (${region})`}
                            />
        const houseDetails = (
            <ItemDetails 
            itemId={this.state.selectedHouse}
            getData={this.gotService.getHouse}> 
                <Field field='region' label='Region: '/>
                <Field field='words' label='Words: '/>
                <Field field='titles' label='Titles: '/>
                <Field field='overload' label='Overload:'/>
                <Field field='ancestralWeapons' label='Weapons:'/>
            </ItemDetails>
        )
        return (
                <Block listItems={itemList} item={houseDetails}/>
        )
    }
}