import { useStore } from "@tanstack/react-form";
import { useFormContext } from "../lib/form-contexts.ts";

export function FormLevelErrors() {
    const context = useFormContext();

    const errors = useStore(context.store, (store) => store.errors);

    if (!errors.length) return null;

    return (
        <em>{errors?.join(", ")}</em>
    );
}