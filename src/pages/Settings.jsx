import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";

const fontSizes = [
  {
    title: "Small",
    value: "12px",
  },
  {
    title: "Medium",
    value: "16px",
  },
  {
    title: "Large",
    value: "20px",
  },
];
const animationSpeeds = [
  {
    title: "Slow",
    value: 2,
  },
  {
    title: "Medium",
    value: 1,
  },
  {
    title: "Fast",
    value: 0.5,
  },
];
const primaryColors = [
  "rgb(255, 0, 86)",
  "rgb(33, 150, 243)",
  "rgb(255, 193, 7)",
  "rgb(0, 200, 83)",
  "rgb(156, 39, 176)",
];

const themes = [
  {
    "--background-color": "#fff",
    "--background-light": "#fff",
    "--shadow-color": "rgba(0,0,0,0.2)",
    "--text-color": "#0A0A0A",
    "--text-light": "#575757",
  },
  {
    "--background-color": "rgb(29, 29, 29)",
    "--background-light": "rgb(77, 77, 77)",
    "--shadow-color": "rgba(0,0,0,0.2)",
    "--text-color": "#ffffff",
    "--text-light": "#eceaea",
  },
];

const Settings = ({ settings, setSettings }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [primaryColor, setPrimaryColor] = useState(
    primaryColors.findIndex((color) => color === settings["--primary-color"])
  );
  const [fontSize, setFontSize] = useState(
    fontSizes.findIndex((font) => font.value === settings["--font-size"])
  );
  const [animationSpeed, setAnimationSpeed] = useState(
    animationSpeeds.findIndex(
      (speed) => speed.value === settings["--animation-speed"]
    )
  );

  function changeFontSize(i) {
    const _size = fontSizes[i];
    let _settings = { ...settings };
    _settings["--font-size"] = _size.value;
    setFontSize(i);
    setSettings(_settings);
    localStorage.setItem("settings", JSON.stringify(_settings));
  }

  function changeAnimationSpeed(i) {
    let _speed = animationSpeeds[i];
    let _settings = { ...settings };
    _settings["--animation-speed"] = _speed.value;
    setAnimationSpeed(i);
    setSettings(_settings);
    localStorage.setItem("settings", JSON.stringify(_settings));
  }

  function changeTheme(i) {
    const _theme = { ...themes[i] };
    setTheme(i === 0 ? "light" : "dark");
    let _settings = { ...settings };
    for (let key in _theme) {
      _settings[key] = _theme[key];
    }
    setSettings(_settings);
    localStorage.setItem("settings", JSON.stringify(_settings));
    localStorage.setItem("theme", i === 0 ? "light" : "dark");
  }

  function changeColor(i) {
    const _color = primaryColors[i];
    let _settings = { ...settings };
    _settings["--primary-color"] = _color;
    setPrimaryColor(i);
    setSettings(_settings);
    localStorage.setItem("settings", JSON.stringify(_settings));
  }

  return (
    <div>
      <div className="hero d-block settings">
        <h2>Preferred theme</h2>
        <div className="options-container">
          <div className="option light" onClick={() => changeTheme(0)}>
            {theme === "light" && (
              <div className="check">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}
          </div>
          <div className="option dark" onClick={() => changeTheme(1)}>
            {theme === "dark" && (
              <div className="check">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hero d-block settings">
        <h2>Primary color</h2>
        <div className="options-container">
          {primaryColors.map((color, i) => (
            <div
              onClick={() => changeColor(i)}
              key={color}
              className="option light"
              style={{ backgroundColor: color }}
            >
              {primaryColor === i && (
                <div className="check">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero d-block settings">
        <h2>Font Size</h2>
        <div className="options-container">
          {fontSizes.map((size, i) => (
            <button
              className="btn"
              key={size.value}
              onClick={() => changeFontSize(i)}
            >
              {size.title}
              {fontSize === i && (
                <span>
                  <FontAwesomeIcon icon={faCheck} />{" "}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="hero d-block settings">
        <h2>Animation speed</h2>
        <div className="options-container">
          {animationSpeeds.map((speed, i) => (
            <button
              className="btn"
              key={speed.value}
              onClick={() => changeAnimationSpeed(i)}
            >
              {speed.title}
              {animationSpeed === i && (
                <span>
                  <FontAwesomeIcon icon={faCheck} />{" "}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  settings: PropTypes.object,
  setSettings: PropTypes.func,
};

export default Settings;
