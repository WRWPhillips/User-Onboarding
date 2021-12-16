import React, { useState, useEffect } from 'react';

export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }
return(
    <form className='form container' onSubmit={onSubmit}>
        <div className='form-group submit'>
            <h3>Add User Here</h3>

            <button id='submit' disabled={disabled}>Submit</button>

            <div className='errors'>
                <div>{errors.first_name}</div>
                <div>{errors.last_name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.tos}</div>
            </div>
        </div>
        <div className='form-group inputs'>
            <h3>Required information</h3>
            <label>First Name:{"  "}
                <input 
                    value={values.first_name}
                    onChange={onChange}
                    name='first_name'
                    type='text'
                />
            </label>

            <label>Last Name:{"  "}
                <input 
                    value={values.last_name}
                    onChange={onChange}
                    name='last_name'
                    type='text'
                />
            </label>

            <label>Email:{"  "}
                <input 
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    type='email'
                />
            </label>

            <label>Password:{"  "}
                <input 
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                />
            </label>
        </div>
        <div className='form-group TOS-checkbox'>
            <label>Agree to our Terms of Service:{"  "}
                <input 
                    onChange={onChange}
                    name='tos'
                    type='checkbox'
                    checked={values.tos}
                />
            </label>
        </div>
    </form>
)
}