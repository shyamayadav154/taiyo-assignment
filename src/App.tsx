import { Navigate, Route, Routes } from "react-router-dom";
import Contacts from "./pages/Contacts";
import ChartsAndMaps from "./pages/ChartsAndMaps";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
    return (
        <main className="bg-gray-50">
            <section className="   h-screen flex">
                <Sidebar />
                <section className="border-x  flex-1 p-5">
                    <Header/> 
                    <Routes>
                        <Route path="/" index element={<Navigate to="/contacts" />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
                    </Routes>
                </section>
            </section>
        </main>
    );
}

export default App;
