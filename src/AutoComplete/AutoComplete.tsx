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
  const [userText, setUserText] = useState<string>('');
  const [cities, setCities] = useState<CityProps[]>([]);
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(true);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let citySorter: Array<CityProps> = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      citySorter = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((v: CityProps) => regex.test(v.name));
    }
    setIsDropDownVisible(true);
    setUserText(value);
    setCities(citySorter);
  };

  const citySelected = (value: CityProps) => {
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
        value={userText}
        onChange={onTextChanged}
        className="input"
      />
      {cities.length > 0 && isDropDownVisible && (
        <ul className="dropdown-container">
          {cities.map((item: CityProps) => (
            <li
              key={`${item.lat}${item.lng}`}
              className="dropdown-container-item"
              onClick={() => citySelected(item)}
            >
              <button className="dropdown-container-button">{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
