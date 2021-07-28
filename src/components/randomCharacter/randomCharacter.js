import React, {Component} from 'react';
import './randomCharacter'
import GotService from '../../services/script';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types'

export default class RandomCharacter extends Component {

    gotService = new GotService();
    state = {
        character: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        const {interval} = this.props;
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error:true,
            loading: false
        })
    }

    updateCharacter = () => {
        const id=Math.floor(Math.random()*140+50);
        this.gotService.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render');
        const {character, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View character={character}/> : null;
        return (
            <div>
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}
RandomCharacter.defaultProps = {
    interval: 1500
}
RandomCharacter.propTypes = {
    interval: PropTypes.number
}
const View = ({character}) => {
    const {name, gender, born, died, culture} = character;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul>
                <li>
                    <span>Gender: </span>
                    <span>{gender}</span>
                </li>
                <li>
                    <span>Born: </span>
                    <span>{born}</span>
                </li>
                <li>
                    <span>Died: </span>
                    <span>{died}</span>
                </li>
                <li>
                    <span>Culture: </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}