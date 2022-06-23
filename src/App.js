import logo from './logo.svg';
import './App.css';
import DrawerLayout from"./Components/DrawerLayout"
import { Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <DrawerLayout>
        <Switch>
          <Route>
            
          </Route>
        </Switch>
      </DrawerLayout>
    </div>
  );
};

export default App;
