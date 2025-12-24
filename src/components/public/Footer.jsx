const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">KostFinder</h3>
            <p className="text-gray-400 mb-2">
            Temukan kost impianmu dengan mudah dan cepat
            </p>
            <p className="text-gray-400">
            &copy; {new Date().getFullYear()} KostFinder. All rights reserved.
            </p>
        </div>
        </footer>
    )
    }

    export default Footer