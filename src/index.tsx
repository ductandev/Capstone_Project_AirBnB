import ReactDOM from "react-dom/client";

import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate, } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";

import HomeTemplate from "./Templates/HomeTemplate";
import Profile from "./Pages/Profile/Profile";
import Favourite from "./Pages/Favourite/Favourite";

// Setup redux
import { store } from "./Redux/configStore";
import { Provider } from "react-redux";

import Loading from "./Components/Loading/Loading";
import ResponsiveItem from "./Templates/ResponsiveItem";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import DetailMobile from "./Pages/Detail/DetailMobile";
import Search from "./Pages/Search/Search";
import TripHistory from "./Pages/TripHistory/TripHistory";

export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <Loading></Loading>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home/>}></Route>
          <Route path="detail">
            <Route path=':id' element={<ResponsiveItem component={Detail} largeTableComponent={DetailMobile} />}></Route>
          </Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="trips" element={<TripHistory/>}></Route>
          <Route path="favourite" element={<Favourite />} />
          <Route path="search" element={<Search />} />

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>

      </Routes>
    </HistoryRouter>
  </Provider>
);
