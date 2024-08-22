import './App.css'
import {ChangeEvent, MouseEvent} from "react";
import {Navigate, Outlet, Route, Routes, useNavigate, useParams} from "react-router";
import {Provider, useDispatch, useSelector} from 'react-redux'
import {searchRequest} from "./store/actions";
import {DetailInfo, Service} from "./types";
import {store} from "./store";
import logoIcon from "./assets/react.svg";
import {servicesState} from "./store/slices/services";

function App() {

  return (
      <Provider store={store}>
          <Routes>
              <Route path="/" element={<Layout></Layout>}>
                  <Route path="/" element={<Navigate to="/services"/>}/>
                  <Route path="/services" element={<><Search></Search><List></List></>}/>
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

function Search() {
    const dispatch = useDispatch()
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatch(searchRequest(event.target.value));
    }
  return (
      <div>
          <label htmlFor="search">Поиск:</label>
          <input name="search" type="text" placeholder="Type something to search..."
                 className="search-input" onChange={onChange}></input>
      </div>
  )
}

function List() {
    const {loading, error, services} = useSelector(servicesState);
    if (loading) {
        return (<Spinner/>);
    }
    return error ? (<Error error={error}/>) : (<ListContent services={services}/>)
}

function ListContent(props: {services: Service[]}) {
    const {services} = props;
    return services.length == 0
        ? (<div><span>Ничего не найдено</span></div>)
        : (<ul className="list">{services.map(i => (<li>{i.name}</li>))}</ul>)
}

function Spinner() {
    return (
        <div>
            <span>Идёт запрос на сервер...</span>
        </div>
    )
}

function Error(props: {error: Error}) {
    const {error} = props;
    return (
        <div>
            <span>Ошибка: {error.message}</span>
        </div>
    )
}

export function Header() {
    const navigate = useNavigate();
    const onHomeClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate("/");
    }
    return (
        <header className="header">
            <div className="logo" onClick={onHomeClick}>
                <img src={logoIcon} alt="logo" className="react"/>
                <h1>Search services</h1>
            </div>
        </header>
    )
}

export function ServiceDetails() {
    const id = useParams()["id"] as string;
    const error = null;
    return id
        ? (<Spinner/>)
        : error ? (<Error error={error}/>) : (<ServiceCard details={{} as DetailInfo}/>)
}

function ServiceCard(props: {details: DetailInfo}) {
    const {details: d} = props;
    return (
        <div className="service-card">
            <span><b>Наименование: </b>{d.name}</span><br/>
        </div>
    )
}