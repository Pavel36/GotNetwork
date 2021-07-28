import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import GotService from '../../services/script';

class ItemList extends Component {

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={id}
                    onClick={()=>this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render () {
        const {data} = this.props;
        const items = this.renderItems(data);
        return (
            <ul>
                {items}
            </ul>
        );
    }
}

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null
        }
        componentDidMount() {
            getData()
                .then((data)=>{
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const {data} = this.state;

            if(!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data}/>
        }
    }
}
const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);