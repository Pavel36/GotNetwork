import React, {Component} from 'react';
import RandomCharacter from '../randomCharacter/randomCharacter';
import './app.css'
import Header from '../header/header';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage/characterPage';
import BookPage from '../pages/bookPage/bookPage';
import HousePage from '../pages/housePage/housePage';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BooksItem from '../pages/booksItem';

export default class App extends Component {
    state = {
        showBlock: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onDelete = () => {
        this.setState(({showBlock})=>{
            const neVa = !showBlock;
            return {
                showBlock: neVa
            }
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        } 
        const {showBlock} = this.state;
        const toggleBlock = showBlock ? <RandomCharacter interval={15000}/> : null;
        return (
            <Router>
                    <Header/>
                    <div className='app'>
                        {toggleBlock}
                        <button onClick={this.onDelete}>hide this block</button>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' exact component={BookPage} />
                        <Route path='/books/:id' render={
                            ({match})=>{
                                const {id} = match.params;
                            return <BooksItem bookId={id}/>}
                        }/>
                        <Route path='/houses' component={HousePage} />
                    </div>
            </Router>
        )
    }
}