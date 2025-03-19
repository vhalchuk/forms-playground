import { useFieldContext } from "../lib/form-contexts.ts";

export function TextField({ label }: { label: string }) {
    const field = useFieldContext<string>();

    return (
        <>
            <label htmlFor={field.name}>{label}</label>
            <input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
            />
        </>
    )
}