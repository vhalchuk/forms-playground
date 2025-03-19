import { createFormHook } from "@tanstack/react-form";
import { TextField } from "../components/text-field.tsx";
import { SubmitButton } from "../components/submit-button.tsx";
import { FormLevelErrors } from "../components/form-level-errors.tsx";
import { fieldContext, formContext } from "./form-contexts.ts"

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton,
        FormLevelErrors
    },
    fieldContext,
    formContext,
})