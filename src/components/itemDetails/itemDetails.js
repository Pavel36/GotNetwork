import React, {Component} from 'react';
import GotService from '../../services/script';
const Field = ({item, field, label}) => {
    return (
        <li>
            <span>{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Field
}
export default class ItemDetails extends Component {
    gotService = new GotService();
    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {getData, itemId} = this.props;
        if(!itemId) {
            return;
        }
        getData(itemId)
            .then((item)=> {
                this.setState({item})
            });
    }
    render() {
        
        if(!this.state.item) {
            return <span>Please select a item</span>
        }
        const {item} = this.state;
        const {name} = item; 
        return (
            <div>
                <h4>{name}</h4>
                <ul>
                   {React.Children.map(this.props.children, (child)=>{
                       return React.cloneElement(child, {item})
                   }) }
                </ul>
            </div>
        )
    }
}