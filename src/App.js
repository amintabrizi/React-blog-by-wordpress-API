import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//import Contexts
import AppContexts from './Contexts/AppContexts';

//import routers
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import code split function
import AsyncComponent from './AsyncComponent';

//import Componets
const HeaderComponent = AsyncComponent(() => {
  return import('./Components/HeaderComponent')
  .then(module => module.default)
})
const SidebarComponent = AsyncComponent(() => {
  return import('./Components/SidebarComponent')
  .then(module => module.default)
})
const PostsComponent = AsyncComponent(() => {
  return import('./Components/PostsComponent')
  .then(module => module.default)
})
const FooterComponent = AsyncComponent(() => {
  return import('./Components/FooterComponent')
  .then(module => module.default)
})

const SinglePageComponent = AsyncComponent(() => {
  return import('./Components/SinglePageComponent')
  .then(module => module.default)
})

const SinglePostComponent = AsyncComponent(() => {
  return import('./Components/SinglePostComponent')
  .then(module => module.default)
})

const CategoryComponent = AsyncComponent(() => {
  return import('./Components/CategoryComponent')
  .then(module => module.default)
})


function App() {

  const baseURL = window.location.host;

  return (
    <Router>
      <AppContexts.Provider value={{
        baseURL
      }}>
        <div className="App">
          
          <HeaderComponent />
            <div className="container mt-4">
              <div className="row">
                <Switch>
                  <Route path="/" exact >
                    <PostsComponent />
                  </Route>
                  <Route path="/post/:id" component={SinglePostComponent} />
                  <Route path="/category/:id" component={CategoryComponent} />
                  <Route path="/page/:id" component={PostsComponent} />
                  <Route path="/:id" component={SinglePageComponent} />
                </Switch>
                <SidebarComponent />
              </div>
            </div>
          <FooterComponent />

        </div>
      </AppContexts.Provider>
    </Router>
  );
}

export default App;

