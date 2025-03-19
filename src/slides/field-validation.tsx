import { useForm } from "@tanstack/react-form"
import {useId} from "react";

export function FieldValidation() {
    const form = useForm({
        defaultValues: {
            age: 0,
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2))
        },
    });

    const ageFieldId = useId();

    return (
        <form
            onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                void form.handleSubmit();
            }}
        >
            <form.Field
                name="age"
                validators={{
                    onChange: ({ value }) =>
                        value > 13 ? undefined : 'Must be 13 or older',
                    // onBlur: ({ value }) =>
                    //     value > 13 ? undefined : 'Must be 13 or older',
                    // onSubmit:
                    //     ({ value }) =>
                    //         value > 13 ? undefined : 'Must be 13 or older',
                    // onMount: ({ value }) =>
                    //     value > 13 ? undefined : 'Must be 13 or older',
                }}
                children={(field) => (
                    <>
                        <label htmlFor={ageFieldId}>Age</label>
                        <input
                            id={ageFieldId}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type="number"
                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                        />
                        {field.state.meta.errors.length ? (
                            <em>{field.state.meta.errors.join(', ')}</em>
                        ) : null}
                    </>
                )}
            />
            <input type="submit"/>
        </form>
    )
}