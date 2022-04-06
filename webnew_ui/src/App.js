import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ViewPositionComponent from "./components/viewposition/ViewPositionComponent";
import ViewPosition from "./pages/viewposition/ViewPosition";
import ViewTopic from "./pages/viewtopic/ViewTopic";
import ViewUser from "./pages/viewuser/ViewUser";
import { Context } from './context/Context'
import { useContext } from 'react'
import Create from "./pages/create/Create";
import Refuse from "./pages/refuse/Refuse";
import Management from "./pages/management/Management";

function App() {
    const {user} = useContext(Context)
    
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          { user ? <Home /> : <Login />}     
        </Route>
        {/* <Route path="/write">
          {user ? <Write /> : <Login />}
        </Route> */}
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
        <Route path="/viewposition">
          {user ? <ViewPosition/> : <Login/>}
        </Route>
        <Route path="/viewtopic">
        {user ? <ViewTopic/> : <Login/>}
        </Route>
        <Route path="/viewuser">
        {user ? <ViewUser/> : <Login/>}
        </Route>
        <Route path="/create">
        {user ? <Create/> : <Login/>}
        </Route>
        <Route path="/refuse">
        {user ? <Refuse/> : <Login/>}
        </Route>
        <Route path="/management">
        {user ? <Management/> : <Login/>}
        </Route>
        <Route path="/new/:newId">
          <Single />
        </Route>
      </Switch>
    </Router >

  );
}

export default App;
