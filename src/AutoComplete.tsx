import { ChangeEvent, useState } from 'react';
import './AutoComplete.css';

interface CityProps {
  name: string;
  lat: string;
  lng: string;
}
interface AutoCompleteProps {
  data: Array<CityProps>;
}

const AutoComplete = ({ data }: AutoCompleteProps): JSX.Element => {
  const [search, setSearch] = useState({
    text: '',
    cities: []
  });
  const [isDropDownVisible, setIsDropDownVisible] = useState(true);
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let cities: Array<CityProps> = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      cities = data.sort().filter((v: CityProps) => regex.test(v.name));
    }
    setIsDropDownVisible(true);
    setSearch({ cities, text: value });
  };

  const citiesSelected = (value: CityProps) => {
    setIsDropDownVisible(false);

    setSearch({
      text: value.name,
      cities: []
    });
  };

  const { cities } = search;
  return (
    <div onClick={() => setIsDropDownVisible(false)}>
      <input
        type="text"
        name="citySearch"
        id="citySearch"
        autoComplete="off"
        value={search.text}
        onChange={onTextChanged}
      />
      {cities.length > 0 && isDropDownVisible && (
        <div>
          {cities.map((item: CityProps) => (
            <div key={item.name}>
              <div key={item.name} onClick={() => citiesSelected(item)}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
