import { useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";


export default function Form() {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phNumbers: ['']
        },

        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required")
        })
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{display: "flex", flexDirection: "column", width: "300px"}}>
            <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}

            <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
            ) : null}

            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            <FieldArray name = "phNumbers">
                {(props) => {
                    const {push, remove, form} = props
                    const {values} = form
                    const phNumbers = values ? values.phNumbers : [];
                    return (
                        <div>
                            {phNumbers.map((phNumbers, index) => (
                                <div key={index}>
                                    <Field name={`phNumbers[$index]`}/>
                                    <button type='button' onClick={() => remove(index)}> - </button>
                                    <button type='button' onCLick={() => push('')}> + </button>

                                    <button></button>
                                </div>
                            ))}
                        </div>
                    )
                }}

            </FieldArray>


            <button type="submit">Submit</button>
        </form>
    );
}
