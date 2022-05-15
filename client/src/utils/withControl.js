/**
 * Generic React Hook Form Controller factory (turns any component into a React Hook Form controllable one)
 *    @param {ReactElement} Component - component to wrap with Controller (should take react-hook-form's Controller props)
 *
 * Used on: Input
 *
 * Props (returned component):
 *      - control [Object] - control object from react-hook-form's useForm hook
 *      - name [string] - unique name for controlled component
 *      - defaultValue? [any] - default value if desired. default: ''
 *                              not needed if default value is configured via the useForm hook
 *      - rules? [Object] - validation rules if desired. default: {}
 *      - onChange? [function] - custom function to run on change (overrides default behavior, which is to just set the raw value)
 *                             - if you provide this prop, you are responsible for calling useForm's setValue for this field
 *                             - value is passed as a param to the provided function
 *      - * all other props from Component are supported
 *      - * more info about Controller props: https://react-hook-form.com/api/usecontroller/controller
 */
import React from "react";
import { useController } from "react-hook-form";

function withControl(Component) {
  function controlledComponent({
    control,
    name,
    defaultValue,
    rules = {},
    onChange,
    required,
    ...inputProps
  }) {
    rules.required = required;

    const {
      field: { onChange: formOnChange, ...field },
      fieldState,
    } = useController({
      name,
      control,
      rules,
      defaultValue,
    });

    return (
      <Component
        {...fieldState}
        {...field}
        {...inputProps}
        onChange={(val) => {
          if (onChange) onChange(val);
          else formOnChange(val);
        }}
      />
    );
  }

  return controlledComponent;
}

export default withControl;
