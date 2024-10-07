import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/portfolioPage";
import Popularstock from "./pages/popularstock";
import Intereststock from "./pages/intereststock";
import SearchPage from "./pages/searchPage";
import StockPage from "./pages/stockPage";
import RankingPage from "./pages/rankingPage";
import MyPage from "./pages/myPage";
import CashChargePage from "./pages/cashChargePage";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import KakaoRedirect from "./pages/kakaoRedirect";
import Legal from "./pages/license";
import CashChargeSuccessPage from "./pages/cashChargeSuccessPage";
import CashChargeFailPage from "./pages/cashChargeFailPage";
import PleaseLogin from "./pages/pleaseLoginPage";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const protectedRoutes = [
    { path: "/portfolio", element: <PortfolioPage /> },
    { path: "/portfolio/:id", element: <PortfolioPage /> },
    { path: "/mypage", element: <MyPage /> },
    { path: "/cashcharge", element: <CashChargePage /> },
  ];

  return (
    <Router>
      <Routes>
        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={isAuthenticated ? element : <PleaseLogin />}
          />
        ))}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth" element={<KakaoRedirect />} />
        <Route path="/intereststock" element={<Intereststock />} />
        <Route path="/popularstock" element={<Popularstock />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/stock/:id" element={<StockPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/success-payment" element={<CashChargeSuccessPage />} />
        <Route path="/fail-payment" element={<CashChargeFailPage />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </Router>
  );
}

export default App;
