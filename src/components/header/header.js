import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div>
                <h3>
                    <Link to='/'>
                        GameOfThrones DB
                    </Link>
                </h3>
            </div>
            <ul>
                <li>
                    <Link to='/characters/'>
                        Characters
                    </Link>
                </li>
                <li>
                    <Link to='/books/'>
                        Books
                    </Link>
                </li>
                <li>
                    <Link to='/houses/'>
                        Houses
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default Header