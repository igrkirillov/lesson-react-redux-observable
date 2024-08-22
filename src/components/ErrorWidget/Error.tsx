import {MouseEvent} from "react";

export function ErrorWidget(props: {error: string, retryCallback: () => void}) {
    const {error, retryCallback} = props;
    const onRetryButtonClick = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        retryCallback();
    }
    return (
        <>
            <div>
                <span>Ошибка: {error}</span>
            </div>
            <div>
                <input type="button" onClick={onRetryButtonClick} value="Попробовать ещё раз"/>
            </div>
        </>
    )
}