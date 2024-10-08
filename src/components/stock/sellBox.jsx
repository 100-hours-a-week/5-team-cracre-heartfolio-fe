import React, { useState } from "react";
import Swal from "sweetalert2";
import { moneyChange } from "../../utils/moneyUtils";

function SellBox({
  curPrice,
  amount,
  id,
  setIsSellModalOpen,
  setSellDetails,
  isLoggedIn,
}) {
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("access_token");

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100000) {
      setQuantity(e.target.value);
    }
  };

  function handlePercentQuantity(percent) {
    setQuantity(Math.floor(amount * (percent / 100)));
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 서비스입니다.",
        footer: '<a href="/login">로그인 하러가기</a>',
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    } else if (amount < quantity) {
      Swal.fire({
        icon: "error",
        text: "본인의 보유 수량을 확인해주세요",
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    }
  }
  const total_money = curPrice * quantity;

  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";

  async function sell() {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 서비스입니다.",
        footer: '<a href="/login">로그인 하러가기</a>',
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    } else if (amount < quantity) {
      Swal.fire({
        icon: "error",
        text: "본인의 보유 수량을 확인해주세요",
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    } else {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URI}/invest/order`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockId: id,
            quantity: quantity,
            price: curPrice,
          }),
        });
        if (response.ok) {
          setSellDetails({
            quantity: quantity,
            price: curPrice,
            total: quantity * curPrice,
          });
          setIsSellModalOpen(true);
          return;
        }
        // 토큰 만료 처리
        if (response.status === 401) {
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken);

            // 새로운 access token으로 요청 다시 시도
            response = await fetch(`${process.env.REACT_APP_API_URI}/invest/order`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                stockId: id,
                quantity: quantity,
                price: curPrice,
              }),
            });

            if (response.ok) {
              setSellDetails({
                quantity: quantity,
                price: curPrice,
                total: quantity * curPrice,
              });
              setIsSellModalOpen(true);
            }
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return;
          }
        }
      } catch (error) {
        // console.error("error:", error);
      }
    }
  }

  return (
    <div>
      <div className="flex w-[350px] pt-5">
        <div className="flex items-center w-[170px] justify-between">
          <label className="text-gray-600">수량</label>
          <div className="flex items-center">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
              className="h-[30px] w-[100px] text-gray-600"
            ></input>
            <p className="text-gray-600 ml-1 ">주</p>
          </div>
        </div>
        <div className="w-[180px] text-center">
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor text-gray-600"
            onClick={() => setQuantity(0)}
          >
            0
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={()=>handlePercentQuantity(25)}
          >
            25%
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={()=>handlePercentQuantity(50)}
          >
            50%
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={()=>handlePercentQuantity(100)}
          >
            최대
          </button>
        </div>
      </div>
      <div className="flex w-[350px] justify-between mt-5">
        <div className="flex items-center w-1/2">
          <p className=" text-gray-600">총액</p>
          <p
            className={`${
              total_money > 100000000 ? "text-xs" : "text-sm"
            } h-[30px] w-[120px] content-center text-right text-gray-600`}
          >
            {moneyChange(total_money)} KRW
          </p>
        </div>
        <div className="flex items-center w-1/2">
          <p className=" text-gray-600">보유수량</p>
          <p className="h-[30px] w-[115px] content-center text-right text-xs  text-gray-600">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${buttonStyle} h-10 w-[180px] mt-5 rounded-md text-sm  text-gray-600 cursor-pointer`}
          disabled={isDisabled}
          onClick={() => sell()}
        >
          매도
        </button>
      </div>
    </div>
  );
}

export default SellBox;
