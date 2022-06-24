import logo from './logo.svg';
import './App.css';
import DrawerLayout from "./Components/DrawerLayout";
import {Switch,Route} from "react-router-dom";
import Medicine from './Container/Medicine/Medicine';
import Patient from './Container/Patient/Patient';

function App() {
  return (
    <div className="App">
      <DrawerLayout>
          <Switch>
             <Route path='/Medicine' exact component={Medicine} />
             <Route path='/patient' exact component={Patient} />
          </Switch>
      </DrawerLayout>
    </div>
  );
}

export default App;
