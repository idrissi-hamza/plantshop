import { useField } from "formik";

const TextInput = ({ label, subLabel = "", ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative mb-5 w-full font-display">
      <label
        className="block mb-2  font-bold text-gray-700 text-sm"
        htmlFor={props.id || props.name}
      >
        {label}
        <span className="text-sm text-gray-500 ml-2 italic tracking-wide font-medium">
          {subLabel}
        </span>
      </label>
      <input   
        className="mb-2  h-10 px-3 border-gray-300  border w-full   focus:border-gray-500  outline-none rounded appearance-none "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="absolute error text-red-500 text-xs italic -bottom-3 left-1 tracking-wide">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
