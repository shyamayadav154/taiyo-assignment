import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}



function FormInput({ label, name, ...otherProps }: FormInputProps) {
    return (
        <div className="flex items-center gap-5 grid-cols-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="flex-1">
                <input
                    name={name}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...otherProps}
                />
            </div>
        </div>
    );
}


export default FormInput;

