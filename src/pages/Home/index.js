import Barchart from '@/components/Charts/BarChart'
const Home = () => {
    
    const xData1 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const sData1 = [820, 932, 901, 934, 1290, 1330, 1320]

    const sData2 = [120, 132, 101, 134, 90, 230, 210]
    const sData3 = [220, 182, 191, 234, 290, 330, 310]
    const sData4 = [150, 232, 201, 154, 190, 330, 410]
    
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Barchart xData={xData1} sData={sData1} />
                <Barchart xData={xData1} sData={sData2} />
            </div>
            <div style={{ display: "flex" }}>
                <Barchart xData={xData1} sData={sData3} />
                <Barchart xData={xData1} sData={sData4} />
            </div>
        </div>
    )
}
export default Home