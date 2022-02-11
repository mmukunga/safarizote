
import React from "react";
import Login from "../pages/Login";
import { act, render, screen } from "./test-utils";
import { render, fireEvent } from '@testing-library/react'
import { useAuth } from '../pages/AuthContext'

const AuthContext = useAuth().AuthContext;

describe('Home Component', () => {
    
    it('should log a user in', async () => {
        const login = jest.fn();

        await act(async () => {
            const { getByText } = render(
              <AuthContext.Provider value={{ login }}>
                <Login />
              </AuthContext.Provider>
            );

            const submitButton = getByText('Submit');
            fireEvent.click(submitButton);

            expect(login).toHaveBeenCalledTimes(1);
        });
    });
});