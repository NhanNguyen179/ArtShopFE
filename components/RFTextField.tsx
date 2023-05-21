import React from "react";
import { useController, RegisterOptions, Control } from "react-hook-form";
import styles from "./TextField.module.scss";
import classnames from "classnames";

interface ITextField {
  name: string;
  label?: string | React.ReactElement;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
  hint?: string;
  autoComplete?: string;
  inputType: string;
  control: any;
}

const RFTextField: React.FunctionComponent<ITextField> = ({
  name,
  label,
  placeholder,
  rules,
  disabled,
  autoComplete,
  inputType,
  control,
}: ITextField) => {
  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div
      style={{
        marginTop: label ? "10px" : "0px",
      }}
    >
      <input
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        // maxLength={size}
        disabled={disabled}
        // onBlur={() => {
        //   onBlur();
        // }}
        // onFocus={() => setFocus(true)}
        placeholder={placeholder}
        type={inputType}
        className={styles['input']}
      />

      {/* {inputType === 'password' && (
          <FontAwesomeIcon
            onClick={() => setViewPassword(!viewPassword)}
            style={{
              position: 'absolute',
              right: 6,
              cursor: 'pointer',
              marginTop:
                inputBoxsize === TextFieldSizeEnum.LARGE ? '15px' : '12px',
            }}
            icon={viewPassword ? faEye : faEyeSlash}
            color="#ababab"
          />
        )} */}
    </div>
  );
};

RFTextField.defaultProps = {
  placeholder: "",
  error: "",
  disabled: false,
  rules: {},
};

export default RFTextField;
