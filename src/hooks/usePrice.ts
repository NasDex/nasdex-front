import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateOraclePrices, updatePricesRawData, updateSwapPrices } from "state/common/actions"

export default function usePrice() {
    const [isProgress, setInProgress] = useState(false)
    const dispatch = useDispatch()

    const nameMatching: {[x:string]: string} = {
        SE: "nSE",
        AUST: "aUST",
        TSLA: "nTSLA",
        USD: "USDC",
    }

    async function findPrices() {
        try {
            if(!isProgress) {
                setInProgress(true)

                const request = await fetch('https://beta-api.nasdex.xyz/v1/price/latest', {
                    method: 'get',
                })

                const response = await request.json()

                if(response !== undefined && response.data !== undefined && response.data.data !== undefined) {
                    const data = response.data.data

                    // Price processing
                    const ammPrices:any = {}
                    const oraclePrices:any = {}
                    data.forEach((d:any) => {
                        const assetNames = d.symbol.split("/")
                        const nAssetName: string = assetNames[0]
                        const cAssetName: string = assetNames[1]
                    
                        const correspondingNassetName = nameMatching[nAssetName]
                        const correspondingCassetName = nameMatching[cAssetName]

                        const combinedName = `${correspondingNassetName}/${correspondingCassetName}`
                        
                        if(d.category === "oracle") {
                            oraclePrices[combinedName] = d.price
                        } else {
                            ammPrices[combinedName] = d.price
                        }
                    })

                    // Dispatch to store
                    dispatch(updatePricesRawData({pricesRawData: data}))
                    dispatch(updateSwapPrices({swapPrices: ammPrices}))
                    dispatch(updateOraclePrices({oraclePrices: oraclePrices}))
                }
            }
        } catch (err) {
            console.log(`Error in findPrices()`, err)
        } finally {
            setInProgress(false)
        }
    }
    
    useEffect(() => {
        findPrices()

        setInterval(async() => {
            findPrices()
        }, 10000)

        return () => {
            clearInterval()
        }
    }, [])
}