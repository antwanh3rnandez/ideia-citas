import { useEffect, useState } from "react"
import { getCitas } from '../helpers/getCitas';

export const useFetchGetCitas = () => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    })

    useEffect(() => {
        getCitas()
            .then(data => {
                setState({
                    data,
                    loading: false,
                })
            })
    }, [])

    return state;

}
