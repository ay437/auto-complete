import './AutoComplete.css';

interface CityProps {
  country: string;
  name: string;
  lat: string;
  lng: string;
}
interface AutoCompleteProps {
  data: Array<CityProps>;
}

const AutoComplete = ({ data }: AutoCompleteProps): JSX.Element => {
  return (
    <>
      <input type="text" name="citySearch" id="citySearch" />
      {data.map((city) => (
        <div>{city.name}</div>
      ))}
    </>
  );
};

export default AutoComplete;
