import { InputHTMLAttributes } from "react";

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue: "active" | "inactive";
    name: string;
    label: string;
}

function RadioGroup({ defaultValue, name, label,...otherProps }: RadioGroupProps) {
    const statusOptions = [
        { id: "active", title: "Active" },
        { id: "inactive", title: "Inactive" },
    ];
    return (
        <div className="flex items-center gap-5 mx-auto justify-center">
            <label className="text-base font-semibold text-gray-900">
                {label}
            </label>
            <fieldset className="mt-1">
                <div className="space-y-1">
                    {statusOptions.map((status) => (
                        <div key={status.id} className="flex items-center">
                            <input
                                id={status.id}
                                name={name}
                                type="radio"
                                value={status.id}
                                defaultChecked={status.id === defaultValue}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                {...otherProps}

                            />
                            <label
                                htmlFor={status.id}
                                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                            >
                                {status.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default RadioGroup;
