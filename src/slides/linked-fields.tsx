import { useForm } from "@tanstack/react-form";

const detailTypes = ["birth", "death","any"] as const;

type Detail = {
    type: (typeof detailTypes)[number];
    place: string;
}

export function LinkedFields() {
    const form = useForm({
        defaultValues: {
            place: "",
            details: [] as Detail[]
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
                name="place"
                children={(field) => (
                    <input
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                )}
                listeners={{
                    onChange: ({ value }) => {
                        const details = form.getFieldValue("details");

                        const detail = details.find((detail) => detail.type === "any");
                        const detailIndex = detail ? details.indexOf(detail) : details.length;

                        if (!detail) {
                            form.setFieldValue(`details[${detailIndex}].type`, "any");
                        }
                        form.setFieldValue(`details[${detailIndex}].place`, value);
                        if (value === "") {
                            void form.removeFieldValue("details", detailIndex);
                        }
                    }
                }}
            />
            <form.Field name="details" mode="array">
                {(field) => (
                    <>
                        <div>
                            {detailTypes.map((type) => {
                                const alreadyHasThisType = field.state.value
                                    .findIndex((detail) => detail.type === type) !== -1;

                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        disabled={alreadyHasThisType}
                                        onClick={() => {
                                            field.pushValue({ place: "", type });
                                        }}
                                    >
                                        {type}
                                    </button>
                                )
                            })}
                        </div>
                        {field.state.value.map((detail, i) => {
                            return (
                                <form.Field
                                    key={i}
                                    name={`details[${i}].place`}
                                    listeners={{
                                        onChange: ({ value }) => {
                                            if (detail.type === "any") {
                                                form.setFieldValue("place", value);
                                            }
                                        },
                                    }}
                                >
                                    {(subField) => {
                                        return (
                                            <div>
                                                <label>
                                                    <div>{detail.type}</div>
                                                    <input
                                                        value={subField.state.value}
                                                        onChange={(e) =>
                                                            subField.handleChange(e.target.value)
                                                        }
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        field.removeValue(i);
                                                        if (detail.type === "any") {
                                                            form.setFieldValue("place", "");
                                                        }
                                                    }}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        )
                                    }}
                                </form.Field>
                            )
                        })}
                    </>
                )}
            </form.Field>
            <input type="submit"/>
        </form>
    )
}