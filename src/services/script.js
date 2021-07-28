export default class GotService {

    constructor() {
        this._apiBase='https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Couldnt fetch ${url}, status:${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async() => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCharacter = async(id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllBooks = async() => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    getBook = async(id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    getAllHouses = async() => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    getHouse = async(id) => {
        const book = await this.getResource(`/houses/${id}`);
        return this._transformHouse(book);
    }
    _extractId = (item) => {
        const idRegexp = /\/([0-9]*)$/;
        return item.url.match(idRegexp)[1];
    }
    _isSet(data) {
        if(data) {
            return data
        } else {
            return '--'
        }
    }
    _transformCharacter = (character) => {
        return {
            id: this._extractId(character),
            name: this._isSet(character.name),
            gender: this._isSet(character.gender),
            born: this._isSet(character.born),
            died: this._isSet(character.died),
            culture: this._isSet(character.culture)
        }
    }
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this._isSet(book.name),
            numberOfPages: this._isSet(book.numberOfPages),
            publisher: this._isSet(book.publisher),
            released: this._isSet(book.released)
        }
    }
    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this._isSet(house.name),
            region: this._isSet(house.region),
            words: this._isSet(house.words),
            titles: this._isSet(house.titles),
            overload: this._isSet(house.overload),
            ancestralWeapons: this._isSet(house.ancestralWeapons)
        }
    }
}