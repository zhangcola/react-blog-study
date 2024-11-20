import { useRef, useEffect } from "react"
import * as echarts from 'echarts'

const Barchart = ({xData, sData, style={ width:"400px", height: "300px"}}) => {
    const chartRef = useRef(null)
    useEffect(() => {
        const chartDom = chartRef.current
        const myChart = echarts.init(chartDom)
        const option = {
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: sData,
                type: 'line'
            }]
         }
         myChart.setOption(option)
    }, [sData, xData])
    return (
        <div ref={chartRef}  style={style}/>
    )
}

export default Barchart