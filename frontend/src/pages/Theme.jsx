import React from 'react'

const themes = {
  dark: {
    backgroundColor: 'black',
    color: '#f5f3ce'
  },
  light: {
    backgroundColor: '#367588',
    color: '#f28c38'
  }
}

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}
const ThemeContext = React.createContext(initialState)

function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(false);

  const toggle = () => { setDark(!dark); };
  const theme = dark ? themes.dark : themes.light;

  React.useEffect(() => {
    console.log('..React.useEffect..');
  }, [dark])

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }