import { useQuery } from "@tanstack/react-query";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { formatNumber } from "../lib/util";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const position = [0, 0];

type CountryCovidCase = {
    country: string;
    cases: number;
    deaths: number;
    recovered: number;

    countryInfo: {
        lat: number;
        long: number;
        _id: number;
        flag: string;
    };
};

const useContryCovidCases = () => {
    return useQuery<CountryCovidCase[]>({
        queryKey: ["country-covid-cases"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/countries").then((res) =>
                res.json()
            ),
    });
};

function Map() {
    return (
        <section>
            <h1 className="text-xl text-center mb-2">
                Map
            </h1>
            <section className="h-[300px] w-full  rounded bg-white overflow-hidden">
                <MapWithMarker />
            </section>
        </section>
    );
}

const MapWithMarker = () => {
    const { data: markers, isLoading, isError } = useContryCovidCases();
    if (isLoading) {
        return (
            <div className="h-full w-full grid place-content-center">Loading...</div>
        );
    }
    if (isError) return <p>Error...</p>;

    return (
        <MapContainer
            style={{
                height: "100%",
                width: "100%",
                zIndex: 0,
            }}
            center={position}
            zoom={1}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker) => (
                <SingleMarkerWithPopup key={marker.country} marker={marker} />
            ))}
        </MapContainer>
    );
};

const SingleMarkerWithPopup = ({ marker }: { marker: CountryCovidCase }) => {
    const customIcon = icon({
        iconUrl: "https://i.imgur.com/zrScfVg.png",
        iconSize: [30, 30],
    });

    return (
        <Marker
            key={marker.country}
            position={[marker.countryInfo.lat, marker.countryInfo.long]}
            icon={customIcon}
        >
            <Popup>
                <article className="space-y-1 ">
                    {marker.countryInfo.flag && (
                        <img
                            src={marker.countryInfo.flag}
                            alt={marker.country}
                            className="h-5 w-auto shadow flex-shrin"
                        />
                    )}
                    <h1>
                        {marker.country}
                    </h1>
                    <div>
                        <strong>Coronavirus Cases:</strong>
                        {formatNumber(marker.cases)}
                    </div>
                    <div>
                        <strong>Deaths:</strong>
                        {formatNumber(marker.deaths)}
                    </div>
                    <div>
                        <strong>Recovered:</strong>
                        {formatNumber(marker.recovered)}
                    </div>
                </article>
            </Popup>
        </Marker>
    );
};

export default Map;
