import { useEffect, useState } from "react"
import {request} from "@/utils/request"
function useChannel() {
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        async function getChannels() {
            const res = await request.get('/channels')
            setChannelList(res.data.channels)
        }
        getChannels()
    }, [])

    return {
        channelList
    }

}

export { useChannel }