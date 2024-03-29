import formik, {useFormik} from "formik";
import * as Yup from "yup";
export default function Form() {

    useFormik({
        initialValues : {
            firstName : "",
            lastName : "",
            email : ""
        },

        onSubmit : (values) => {
            console.log(values)
        },

        validationSchema : Yup.object({
            firstName : Yup.string(),
            lastName : Yup.string(),
        })
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}

            />
            <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
            />
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Last Name"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}