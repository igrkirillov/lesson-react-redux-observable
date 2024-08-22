import './App.css'
import {Navigate, Outlet, Route, Routes} from "react-router";
import {Provider} from 'react-redux'
import {store} from "./store";
import {Header} from "./components/Header/Header";
import {List} from "./components/List/List";
import {ServiceDetails} from "./components/ServiceDetails/ServiceDetails";

function App() {

  return (
      <Provider store={store}>
          <Routes>
              <Route path="/" element={<Layout></Layout>}>
                  <Route path="/" element={<Navigate to="/services"/>}/>
                  <Route path="/services" element={<List></List>}/>
                  <Route path="/services/:id" element={<ServiceDetails></ServiceDetails>}/>
              </Route>
          </Routes>
      </Provider>
  )
}

export default App

function Layout() {
    return (
        <div className="layout">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    )
}

