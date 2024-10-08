import Header from "../components/common/header";
import Stocktype from "../components/mock investment/stocktype";
import EachpopularStockBox from "../components/commonBox/eachpopularstockBox";
import ButtomNavigation from "../components/common/bottomNavigation";
import useFetch from "../hooks/useFetch";
import { Loading } from "../components/common/loading";
import { useState } from "react";

function Popularstock() {
  const { data, error, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/stock/popular?limit=` + 25
  );

  return (
    <>
      <Header />
      <div className="pt-[80px] min-h-dvh bg-white">
        <Stocktype />
        {/* 인기종목리스트 */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center pt-5">Error : {error.message}</div>
        ) : !data || data.length === 0 ? (
          <div className="text-center pt-5"> No data available</div>
        ) : (
          <div
            className="mx-auto max-w-[390px] cursor-pointer overflow-y-auto scrollbar-hide"
            style={{ height: "calc(100dvh - 206px)" }}
          >
            {/* map을 사용하여 상위 50개 종목 반복 렌더링 */}
            {data?.map((stock) => (
              <EachpopularStockBox
                key={stock.stockId}
                stockId={stock.stockId} //주식별 고유 아이디(기본키)
                rank={stock.rank} //순위
                stockKorea={stock.koreanName}
                stockName={stock.englishName} //종목명
                currentPrice={stock.currentPrice} //현재가
                earningValue={stock.earningValue} //전일대비 증가량
                earningRate={stock.earningRate} //수익률
              />
            ))}
          </div>
        )}
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Popularstock;
