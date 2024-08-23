import { useLocation, Link } from 'react-router-dom';
import BackArrow from '../../assets/BackArrow.svg';
import { AppRoutes } from '../../routes/Routes';

interface iHeader {
    title: React.ReactNode;
}

export default function Header({ title }: iHeader) {
    const location = useLocation();

    const isHome = location.pathname === AppRoutes.HOME;
    return (
        <div className="bg-softGray px-[16px] pb-[10px] h-[100px] w-full">
            <div className="max-w-3xl mx-auto flex items-center justify-between h-full">
                {!isHome && (
                    <Link to={AppRoutes.HOME}>
                        <button className="flex items-center justify-center bg-black w-[28px] h-[28px] rounded-[6px]">
                            <img src={BackArrow} alt="Back" />
                        </button>
                    </Link>
                )}
                {title}
                <div className="w-12"></div>
            </div>
        </div>
    );
}

