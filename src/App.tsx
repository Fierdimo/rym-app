
import { Provider } from 'react-redux';
import List from './components/List';
import generateStore from './redux/store';
function App() {
  return (
    <Provider store={generateStore}>
      <List />
    </Provider>
  
  );
}

export default App;
