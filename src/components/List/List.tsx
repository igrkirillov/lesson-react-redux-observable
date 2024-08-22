import {useSelector} from "react-redux";
import {servicesRequest, servicesState} from "../../store/slices/services";
import {useAppDispatch} from "../../hooks";
import {MouseEvent, useEffect} from "react";
import {Service} from "../../types";
import {useNavigate} from "react-router";
import {Spinner} from "../Spinner/Spinner";
import {ErrorWidget} from "../ErrorWidget/Error";

export function List() {
    const {loading, error, services} = useSelector(servicesState);
    const dispatch = useAppDispatch();
    const sendRequest = () => {
        dispatch(servicesRequest());
    }
    useEffect(sendRequest, [dispatch])
    if (loading) {
        return (<Spinner/>);
    }
    return error ? (<ErrorWidget error={error} retryCallback={sendRequest}/>) : (<ListContent services={services}/>)
}

function ListContent(props: {services: Service[]}) {
    const {services} = props;
    return services.length == 0
        ? (<div><span>Ничего не найдено</span></div>)
        : (<ul className="list">{services.map(i => (<ListItem item={i}/>))}</ul>)
}

function ListItem(props: {item: Service}) {
    const {item} = props;
    const navigate = useNavigate();
    const onItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate("/services/" + item.id);
    }
    return (<li><a href="#" onClick={onItemClick}>{item.name}: {item.price} руб</a></li>);
}