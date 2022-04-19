import AutoComplete from './AutoComplete/AutoComplete';
import cityData from './utils/data.json';

const App = (): JSX.Element => {
  return (
    <>
      <h1>Cities in UK</h1>
      <AutoComplete data={cityData} />
    </>
  );
};

export default App;
