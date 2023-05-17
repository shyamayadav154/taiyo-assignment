import { Navigate, Route, Routes } from "react-router-dom";
import Contacts from "./pages/Contacts";
import ChartsAndMaps from "./pages/ChartsAndMaps";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
    return (
        <main className="">
            <section className=" bg-white  h-screen flex">
                <Sidebar />
                <section className="border-x bg-gray-100 flex-1 p-5">
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
