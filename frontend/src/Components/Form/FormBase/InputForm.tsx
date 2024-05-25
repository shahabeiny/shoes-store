import React from "react";
import "./Form.css";
import IconLazy from "Components/Icon/IconLazy";

type InputProps = {
  className?: string;
  placeholder?: string;
  accept?: string;
  icon?: string;
  error?: string;
  name?: string;
  value?: string | number;
} & (
  | {
      type?: "text" | "file" | "number" | "email"|"search";
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    }
  | {
      type: "textarea";
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    }
);

const InputForm: React.FC<React.PropsWithChildren<InputProps>> = (props) => {
  let elementType: React.ReactNode;

  if (props.type === "textarea") {
    elementType = (
      <div className="input__wrapper radius__inner input__wrapper--area">
        <textarea
          {...props}
          rows={10}
          cols={10}
          value={props.value}
          style={{ resize: "none", height: "100%" }}
          className={`input-form ${props.className ? props.className : ""}`}
        />
        {props.icon && <IconLazy nameIcon={props.icon} />}
      </div>
    );
  } else {
    elementType = (
      <div
        className={`input__wrapper radius__inner ${props.className ? props.className : ""}`}
      >
        <input
          placeholder={props.placeholder}
          accept={props.accept}
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className={`input-form`}
          autoComplete="off"
        />
        {props.icon && <IconLazy nameIcon={props.icon} />}
      </div>
    );
  }
  
  return (
    <>
      {elementType}
      {props.error && (
        <h2 className="input__error-validate">{props.error}</h2>
      )}
    </>
  );
};

export default React.memo(InputForm);
