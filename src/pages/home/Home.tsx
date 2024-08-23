import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { AppRoutes } from "../../routes/Routes";

// Ugly code, only used to showcase resuability of exercise component
export default function Home() {

    return (
        <div>
            <Header title={
                <h1 className="text-black text-lg font-semibold mx-auto"> Exercises </h1>
            } />
            <div className="flex flex-col items-center py-5 justify-center min-h-screen bg-gray-100">
                <Link to={AppRoutes.EXERCISE + '1'}>
                    <button className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 transition-colors duration-300 my-6">
                        Check In
                    </button>
                </Link>
                <Link to={AppRoutes.EXERCISE + '2'}>
                    <button className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 transition-colors duration-300 my-6">
                        Icebreaker Quiz
                    </button>
                </Link>
                <Link to={AppRoutes.EXERCISE + '3'}>
                    <button className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 transition-colors duration-300 my-6">
                        Brainstorming Session
                    </button>
                </Link>
            </div>
        </div>
    );
}
