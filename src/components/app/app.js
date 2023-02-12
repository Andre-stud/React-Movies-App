import { Component } from 'react';
import { debounce } from 'lodash';


import MoviesList from '../movies-list';
import Tabsitem from '../../tabs';

export default class App extends Component {
  state = {
    inputValue: '',
    debouncedMessage: '',
  };

  onChangeValue = (value) =>{
    this.setState({ inputValue: value },);
    this.debounceTest(value);
  };

  debounceTest = debounce(val => {
    this.setState({
      debouncedMessage: val,
    });
  }, 400);



  render() {
    const {inputValue, debouncedMessage} = this.state;
    return (
      <div className="body">
        <Tabsitem />
        <input className="search" onChange={(e) => this.onChangeValue(e.target.value)} value={inputValue} placeholder="Type to search..." autoFocus />
        <MoviesList debouncedMessage={debouncedMessage}/>
      </div>
    );
  }
}
