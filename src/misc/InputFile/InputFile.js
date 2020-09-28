import React, { useRef, useState } from "react";
import s from "./InputFile.module.css";
import Button from "../Button/Button";

const InputFile = ({
  type,
  multiple,
  buttonSize,
  label,
  withPreview = true,
  containerClass,
  onChange = () => {},
  ...rest
}) => {
  const ref = useRef();

  const [imagesPreview, setImagesPreview] = useState([]);

  const onButtonClick = () => {
    ref.current.click();
  };

  const handleImages = ({ target: { files } }) => {
    const temp = [];

    Array.from(files).forEach((file, i) => {
      console.log("file ===", file);
      const reader = new FileReader();

      reader.onload = async ({ target: { result } }) => {
        temp.push(result);
        if (type === "image") {
          setImagesPreview(temp);
        }
      };
      reader.onloadend = () => {
        if (i === Array.from(files).length - 1) {
          console.log("temp ===", temp);
          onChange(temp);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const onChange = type === "image"

  return (
    <div className={containerClass}>
      <div>
        <p className={s.label}>{label}</p>
        <input
          {...{ ref }}
          type="file"
          className={s.input}
          onChange={handleImages}
          {...{ multiple }}
          {...rest}
        />

        <Button onClick={onButtonClick} title="Завантажити" size={buttonSize} />
      </div>
      {withPreview && (
        <div className={s.images__container}>
          {imagesPreview.map((img) => (
            <img alt="" src={img} className={s.img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputFile;
