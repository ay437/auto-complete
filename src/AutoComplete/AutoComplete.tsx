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
  const [userText, setUserText] = useState('');
  const [cities, setCities] = useState<CityProps[]>([]);
  const [isDropDownVisible, setIsDropDownVisible] = useState(true);
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let citySorter: Array<CityProps> = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      citySorter = data
        .sort()
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((v: CityProps) => regex.test(v.name));
    }
    setIsDropDownVisible(true);
    setUserText(value);
    setCities(citySorter);
  };

  const citiesSelected = (value: CityProps) => {
    setIsDropDownVisible(false);
    setUserText(value.name);
    setCities([]);
  };

  return (
    <div onClick={() => setIsDropDownVisible(false)}>
      <input
        type="text"
        name="citySearch"
        id="citySearch"
        autoComplete="off"
        value={userText}
        onChange={onTextChanged}
        className="input"
      />
      {cities.length > 0 && isDropDownVisible && (
        <div className="dropdown-container">
          {cities.map((item: CityProps) => (
            <div
              key={`${item.lat}${item.lng}`}
              className="dropdown-container-item"
            >
              <div
                key={`${item.lat}${item.lng}`}
                onClick={() => citiesSelected(item)}
              >
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
