import React from 'react';
import { supabase } from '../lib/supabase'
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';

const expectation = `[
  {
    "id": 1,
    "user_id": "b95b6b12-f497-4ade-9e1b-47e65e63f312",
    "created_at": "2023-06-29T17:00:57+00:00"
  }
]`;

describe('MainScreen', () => {
    test('renders Auth screen when not authenticated', async () => {
      //const mockAlert = jest.spyOn(Alert.alert, 'alert');
      const { getByTestId } = render(<App />);

      // Encontre os elementos de entrada de texto para o email e senha
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');

      // Insira as credenciais de login corretas
      fireEvent.changeText(emailInput, 'leonardomattioli00@gmail.com');
      fireEvent.changeText(passwordInput, '123456');

      const signInButton = getByTestId('login-button');
      fireEvent.press(signInButton);
      
      await waitFor(() => expect(getByTestId('home-screen')).toBeDefined(), { timeout: 2000 });

      // Verifique se a tela Home é renderizada
      const authScreen = getByTestId('home-screen');
      expect(authScreen).toBeDefined();

      await waitFor(() => expect(getByTestId('todos')).toBeDefined(), { timeout: 4000 });

      const todos = getByTestId('todos');
      expect(todos.props.children).toEqual(expectation);
    });
  });