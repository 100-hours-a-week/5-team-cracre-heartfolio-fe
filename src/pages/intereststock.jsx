import Header from "../components/header";
import Stocktype from "../components/stocktype";
import Eachintereststock from "../components/eachintereststock";
import ButtomNavigation from "../components/bottomNavigation";

function Intereststock() {

  // const {interest_data, error, loading} = useFetch("https://heartfolio.site/api/stock/favorites");

  // 인기 종목 데이터 배열_목업데이터
  const interest_data = [
      {
          "stockId": 1,
          "stockName": "Apple Inc.", //종목명
          "currentPrice": 15000, //현재가
          "earningValue": 500,//전일대비 증가량
          "earningRate": "3.45" //수익률
      },
      {
          "stockId": 2,
          "stockName": "Alphabet Inc.",
          "currentPrice": 27500,
          "earningValue": 1200,
          "earningRate": "4.56"
      },
      {
          "stockId": 3,
          "stockName": "Amazon.com Inc.",
          "currentPrice": 34000,
          "earningValue": -300,
          "earningRate": "-0.88"
      },
      {
          "stockId": 4,
          "stockName": "Tesla Inc.",
          "currentPrice": 42000,
          "earningValue": 1500,
          "earningRate": "3.70"
      },
      {
          "stockId": 5,
          "stockName": "Microsoft Corp.",
          "currentPrice": 29000,
          "earningValue": 800,
          "earningRate": "2.83"
      },
      {
          "stockId": 6,
          "stockName": "Meta Platforms Inc.",
          "currentPrice": 21000,
          "earningValue": -450,
          "earningRate": "-2.10"
      },
      {
          "stockId": 7,
          "stockName": "Netflix Inc.",
          "currentPrice": 18000,
          "earningValue": 900,
          "earningRate": "5.26"
      },
      {
          "stockId": 8,
          "stockName": "NVIDIA Corp.",
          "currentPrice": 35000,
          "earningValue": 2000,
          "earningRate": "6.06"
      },
      {
          "stockId": 9,
          "stockName": "Adobe Inc.",
          "currentPrice": 14000,
          "earningValue": -200,
          "earningRate": "-1.41"
      },
      {
          "stockId": 10,
          "stockName": "Intel Corp.",
          "currentPrice": 10000,
          "earningValue": 300,
          "earningRate": "3.00"
      }
    ]

console.log(interest_data)

  return (
    <>
      <Header />
      <Stocktype />
      {/* 인기종목리스트 */}
      <div className="mx-auto max-w-[390px] ">
        {/* map을 사용하여 반복 렌더링 */}
        {interest_data.map((stock) => (
          <Eachintereststock
            id={stock.stockId} //주식별 고유 아이디(기본키)
            name={stock.stockName} //종목명
            price={stock.currentPrice} //현재가
            change={stock.earningValue} //전일대비 증가량
            percentage={stock.earningRate} //수익률
          />
        ))}
      </div>
      <ButtomNavigation />
    </>
  );
}
export default Intereststock;
