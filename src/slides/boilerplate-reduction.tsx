import { useAppForm } from "../lib/app-form.ts";

export function BoilerplateReduction() {
    const form = useAppForm({
        defaultValues: {
            firstName: "",
            surname: ""
        },
        onSubmit: ({ value }) => {
            alert(JSON.stringify(value, null, 2))
        },
        validators: {
            onSubmit: ({ value }) => {
                if (!value.firstName) return "First name is required"
                if (!value.surname) return "Surname is required"
                return null;
            }
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
            <h1>Personal Information</h1>
            <form.AppField
                name="firstName"
                children={(field) => <field.TextField label="First Name"/>}
            />
            <form.AppField
                name="surname"
                children={(field) => <field.TextField label="Surname"/>}
            />
            <form.SubmitButton/>
            <form.AppForm>
                <form.FormLevelErrors />
            </form.AppForm>
        </form>
    )
}