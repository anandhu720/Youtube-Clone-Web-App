import React,{useEffect, useState} from 'react'
import "./_app.scss";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { Container } from 'react-bootstrap';
import Login from './screens/loginScreen/Login';
import WatchScreen from './screens/watchScreen/WatchScreen'

import { Route,Switch,Redirect,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchScreen from './screens/searchScreen/SearchScreen';

const Layout = ({children}) => {
  const [sidebar,toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar(value => !value)

  return (
    <>
    <Header handleToggleSidebar={handleToggleSidebar} />
    <div className="app_container">
      <Sidebar
        sidebar={sidebar}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Container fluid className="app_main">
        {children}
      </Container>
    </div>
    </>
  )
}

const App = () => {

  const history = useHistory();

  const {accessToken,loading} = useSelector(state => state.auth)

  useEffect(()=> {

    if(!loading && !accessToken){
      history.push('/login');
    }

  },[accessToken,loading,history])


  return (
    <>
      <Switch>
        <Route exact path="/">
          <Layout><HomeScreen/></Layout>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/search/:query">
          <Layout><SearchScreen/></Layout>
        </Route>
        <Route exact path="/watch/:id">
          <Layout><WatchScreen/></Layout>
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
