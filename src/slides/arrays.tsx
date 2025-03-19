import { useForm } from "@tanstack/react-form";

export function Arrays() {
    const form = useForm({
        defaultValues: {
            people: [
                { name: "John" },
                { name: "Richard" }
            ]
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2))
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                void form.handleSubmit();
            }}
        >
            <form.Field name="people" mode="array">
                {(field) => (
                    <>
                        {field.state.value.map((_, i) => {
                            return (
                                <form.Field key={i} name={`people[${i}].name`}>
                                    {(subField) => {
                                        return (
                                            <div>
                                                <label>
                                                    <div>Name for person {i}</div>
                                                    <input
                                                        value={subField.state.value}
                                                        onChange={(e) =>
                                                            subField.handleChange(e.target.value)
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        )
                                    }}
                                </form.Field>
                            )
                        })}
                        <button onClick={() => field.pushValue({ name: "" })} type="button">
                            Add person
                        </button>
                    </>
                )}
            </form.Field>
            <input type="submit" />
        </form>
    )
}