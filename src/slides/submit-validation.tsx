import { useForm } from "@tanstack/react-form"

export function SubmitValidation() {
    const form = useForm({
        defaultValues: {
            age: 0,
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2))
        },
        validators: {
            onSubmit: ({ value }) => {
                if (value.age <= 13) {
                    return "Must be 13 or older";
                    // return {
                    //     fields: {
                    //         age: 'Must be 13 or older',
                    //     },
                    // }
                }

                return null;
            },
        }
    });

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
                children={(field) => (
                    <>
                        <label htmlFor={field.name}>Age</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type="number"
                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                        />
                        {field.state.meta.errors.length ? (
                            <em>Field validation: {field.state.meta.errors.join(', ')}</em>
                        ) : null}
                    </>
                )}
            />
            <input type="submit"/>
            <form.Subscribe
                selector={(state) => [state.errorMap]}
                children={([errorMap]) => errorMap.onSubmit ? `Form validation: ${errorMap.onSubmit}` : null}
            />
        </form>
    )
}