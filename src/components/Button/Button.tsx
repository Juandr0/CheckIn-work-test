
enum ButtonColor {
    Red = 'red',
    Black = 'black',
    Gray = '#F4F4F5',
}

interface IBProps {
    title: string;
    icon?: string;
    onClick: () => void;
    backgroundColor: ButtonColor;
}

const Button: React.FC<IBProps> = ({ title, icon, onClick, backgroundColor }: IBProps) => {
    return (
        <button
            style={{ backgroundColor }}
            className={'w-full items-center justify-center rounded-md flex py-3.5 text-center text-sm font-semibold text-white'}
            onClick={onClick}>
            <img

                style={{ color: backgroundColor === ButtonColor.Gray ? 'black' : 'white' }}
                className="w-4, h-4"
                src={icon}
            />
            <p
                style={{ color: backgroundColor === ButtonColor.Gray ? 'black' : 'white' }}
                className="ml-2 button"
            >
                {title}
            </p>

        </button>
    )
}

export default Button;
export { ButtonColor }
