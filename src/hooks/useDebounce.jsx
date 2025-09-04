import { useEffect, useState } from "react";

export function useDebounce(value) {
    const [debounced,setDebounced] = useState(value)

    useEffect(() => {
       let timout =  setTimeout(()=> setDebounced(value),1000)
        return ()=> {
            clearTimeout(timout)
        }
    },[value])

    return debounced
}


