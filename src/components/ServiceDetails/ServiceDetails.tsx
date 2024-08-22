import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {detailsRequest, getDetailsState} from "../../store/slices/details";
import {useEffect} from "react";
import {DetailInfo} from "../../types";
import {Spinner} from "../Spinner/Spinner";
import {ErrorWidget} from "../ErrorWidget/Error";

export function ServiceDetails() {
    const id = useParams()["id"] as string;
    const {loading, error, detailInfo} = useAppSelector(getDetailsState);
    const dispatch = useAppDispatch();
    const sendRequest = () => {
        dispatch(detailsRequest(id));
    }
    useEffect(sendRequest, [id, dispatch]) //mounted
    return loading
        ? (<Spinner/>)
        : error ? (<ErrorWidget error={error} retryCallback={sendRequest}/>) : (<ServiceCard details={detailInfo}/>)
}

function ServiceCard(props: {details: DetailInfo}) {
    const {details: d} = props;
    return (
        <div className="service-card">
            <span><b>Наименование: </b>{d.name}</span><br/>
            <span><b>Стоимость: </b>{d.price} руб</span><br/>
            <span><b>Описание: </b>{d.content}</span><br/>
        </div>
    )
}