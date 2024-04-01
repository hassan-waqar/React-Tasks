import { useFormik } from "formik";
import * as Yup from "yup";

export default function Form() {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: ""
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

            <button type="submit">Submit</button>
        </form>
    );
}
