import AuthenticationPage from "./pages/AuthenticationPage";
import DashboardPage from "./pages/DashboardPage";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import './styles/global.css'

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    }
})

function App() {
    return <ThemeProvider theme={darkTheme}>
        <div style={{backgroundColor: `${darkTheme.palette.background.default}`}} className="App">
            {/*<AuthenticationPage/>*/}
            <DashboardPage />
        </div>
    </ThemeProvider>
}

export default App;
