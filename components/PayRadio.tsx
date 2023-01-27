import { Field } from 'formik';
import { SlPaypal,SlCreditCard } from 'react-icons/sl';
import { BsCashCoin } from 'react-icons/bs';
const PayRadio = ({ label, options, ...props }: any) => {
  return (
    <div className="mb-5  w-full font-display flex flex-col gap-4 ">
      <label className="block mb-2  font-bold text-gray-700  text-3xl">
        {label}
      </label>
      <ul className="flex flex-col gap-6">
        {options.map((option: any) => (
          <li
            key={option.value}
            className="flex"
          >
            <Field
              type="radio"
              id={option.value}
              name={props.name}
              value={option.value}
              as={RadioButton}
              label={option.label}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const RadioButton = ({ field, form, ...props }: any) => {
  return (
    <label className="w-full">
      <input
        type="radio"
        {...field}
        {...props}
        className="hidden peer"
        required
      />

      <div className="inline-flex items-center justify-between gap-10 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600s peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:shadow-xl ">
        <span className="w-full text-lg font-semibold">{props.label} </span>
        {props.value === 'paypal' && <SlPaypal className="text-4xl"   />}
        {props.value === 'stripe' && <SlCreditCard className="text-5xl"   />}
        {props.value === 'cashOnDelivery' && (
          <BsCashCoin className="text-5xl"   />
        )}
      </div>
    </label>
  );
};

export default PayRadio;
