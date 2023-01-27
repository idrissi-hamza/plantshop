import { useField } from 'formik';

const TextInput = ({ label, subLabel = '', ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative  w-full font-display mt-10">
      <label
        className=" mb-2  font-bold text-gray-700 text-sm flex items-center justify-start"
        htmlFor={props.id || props.name}
      >
        {label}
        <span className="text-sm text-gray-500 ml-2 italic tracking-wide font-medium">
          {subLabel}
        </span>
        {meta.touched && meta.error ? (
          <span className="absoluten error text-red-500 text-xs italic top-0 left-20 tracking-wide">
            {meta.error}
          </span>
        ) : null}
      </label>
      <input
        className="mb-2  h-10 px-3 border-gray-300  border w-full   focus:border-gray-500  outline-none rounded appearance-none "
        {...field}
        {...props}
      />
    </div>
  );
};

export default TextInput;
