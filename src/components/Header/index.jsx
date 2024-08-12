const Header = () => {
    return (
        <header class="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg">
            <h1 class="text-xl font-semibold">Hello, Arafat!</h1>
            <div class="flex items-center">
                <input type="text" placeholder="Search..." class="bg-gray-200 rounded-full py-2 px-4" />
                <img src="https://via.placeholder.com/40" alt="User Avatar" class="ml-4 rounded-full" />
            </div>
        </header>
    )
};

export default Header;
