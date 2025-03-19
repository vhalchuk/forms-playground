import { useForm } from "@tanstack/react-form"

export function SimplestForm() {
    const form = useForm({
        defaultValues: {
            name: "",
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
            <form.Field
                name="name"
                children={(field) => (
                    <input
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
            />
            <input type="submit" />
        </form>
    )
}