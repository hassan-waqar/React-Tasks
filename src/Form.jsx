import React from 'react';
import { useForm } from 'react-hook-form';

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: true })}
                />
                {errors.firstName && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: true })}
                />
                {errors.lastName && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
