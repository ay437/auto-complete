import AutoComplete from './AutoComplete';
import cityData from './data.json';

const App = (): JSX.Element => {
  return (
    <>
      <h1>This is the auto complete field for cities of the world</h1>
      <AutoComplete data={cityData} />
    </>
  );
};

export default App;
