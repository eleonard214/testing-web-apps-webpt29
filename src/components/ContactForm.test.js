import React from 'react';
import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
    const errors =screen.queryAllByAltText(/^(.*>(error)[^$]*)$/i)
    expect (errors.length).toEqual(0)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/Contact Form/i)
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Contact Form')
    expect(header).toBeTruthy()
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const username = screen.getByLabelText("First Name*")
    userEvent.type(username, 'Joey')
    const errors = await screen.findAllByTestId('error')
    console.log(errors)
    expect(errors).toHaveLength(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole('button')
    userEvent.click(button)    
    const errors = await screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText('First Name*')
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByLabelText('Email*')
    userEvent.type(firstName, 'Sammy')
    userEvent.type(lastName, 'Somebody')
    userEvent.type(email, 'Test')
    fireEvent.change(email, {target:{value: '' }})
    const errors =await screen.queryAllByText(/^(.*?(error)[^$]*)$/i)
    expect(errors).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'bob')
    const errors= await screen.findByTestId('error')
    expect(errors).toHaveTextContent(/email must be a valid email address/i)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText('First Name*')
    const lastName = screen.getByPlaceholderText("Burke")
    const email = screen.getByLabelText('Email*')
    const button = screen.getByRole('button')
    userEvent.type(firstName, 'Sammy')
    userEvent.type(lastName, '')
    userEvent.type(email, 'bobisur@uncle.com')
    userEvent.click(button)
    const errors = await screen.getByTestId('error')
    expect(error).toHaveTextContent('lastName is a required field')

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});