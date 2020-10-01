import React, { useState, useEffect } from "react";
import s from "./Select.module.css";
import PropTypes from "prop-types";

const Select = ({
  options,
  withSearch,
  label,
  valueContainerClass,
  clearInputOnSelect,
  noDefaultValue = false,
  containerClass = "",
  menuClass = "",
  defaultSearchValue,
  onMenuScroll = () => {},
  onSearchValueChange = () => {},
  onSelect = () => {},
  value = "Оберіть значення",
}) => {
  let defaultValue = options[0]?.label;
  if (defaultSearchValue) {
    defaultValue = defaultSearchValue;
  }
  if (noDefaultValue) {
    defaultValue = "";
  }
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [searchValue, setSearchValue] = useState(defaultValue);

  const switchMenuOpened = () => setMenuOpened((prev) => !prev);
  const closeMenu = () => setMenuOpened(false);

  const selectHandler = (option) => {
    onSelect(option);
    setMenuOpened(false);
  };

  const selectSearchHandler = (option) => {
    if (clearInputOnSelect) {
      setSearchValue("");
    } else {
      setSearchValue(option.label);
    }
    onSelect(option);
    setMenuOpened(false);
  };

  const onSearchInputChange = ({ target }) => {
    setSearchValue(target.value);
  };

  useEffect(() => {
    onSearchValueChange(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultSearchValue]);
  return (
    <div className={`${s.wrapper} ${containerClass}`}>
      {!!label && <p className={s.label}>{label}</p>}
      {!withSearch ? (
        <div className={s.container} onBlur={switchMenuOpened}>
          <div
            className={`${s.value__container} ${valueContainerClass}`}
            onClick={switchMenuOpened}
          >
            <span className={s.value__text}>{value}</span>
          </div>
          {isMenuOpened && (
            <div className={s.menu}>
              {options.map((option, i) => (
                <div
                  key={i}
                  className={s.option}
                  onClick={() => selectHandler(option, setSearchValue)}
                >
                  <span className={s.option__text}>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={s.container}>
          {/* <div className={s.value__container} */}
          <input
            value={searchValue}
            placeholder="Оберіть значення"
            className={s.search__input}
            onChange={onSearchInputChange}
            onClick={switchMenuOpened}
          />
          {/* </div> */}
          {isMenuOpened && (
            <div
              className={`${s.menu} ${menuClass}`}
              onScroll={(e) => onMenuScroll(e, searchValue)}
            >
              {options.map((option, i) => (
                <div
                  key={i}
                  className={s.option}
                  onClick={() => selectSearchHandler(option)}
                >
                  <span className={s.option__text}>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isMenuOpened && <div className={s.overlay} onClick={closeMenu} />}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string,
      ]),
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Select;
