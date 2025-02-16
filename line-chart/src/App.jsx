import BestChart1 from "./Components/BestCharts/BestChart1";
import InteractivePerformanceChart from "./Components/GoodCharts/InteractivePerformanceChart";
import PyramidChart from "./Components/GoodCharts/PyramidChart";
import PyramidChart2 from "./Components/GoodCharts/PyramidChart2";
import InteractiveBarChart from "./Components/InteractiveBarChart";
import InteractiveChart from "./Components/InteractiveChart";

function App() {
  return (
    <div className="App">
      {/* <div>

      <h1>Interactive Line Chart</h1>
      <InteractiveChart />
      </div>
      <div>
        <h1>Interactive Bar Chart</h1>
        <InteractiveBarChart/>
      </div> */}

      {/* <InteractivePerformanceChart/> */}
      {/* <PyramidChart/> */}
      {/* <PyramidChart2/> */}
      <BestChart1/>
    </div>
  );
}

export default App;
