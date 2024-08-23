import Home from './pages/home/Home';
import Exercise from './pages/exercise/Exercise';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';

// Home page equals to the exercises page where users open exercises.
export default function App() {
    return (
        <Routes>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.EXERCISE} element={<Exercise />} />
            <Route path={`${AppRoutes.EXERCISE}:id`} element={<Exercise />} />
        </Routes>
    )
}
