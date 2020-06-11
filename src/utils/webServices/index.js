/* eslint-disable no-console */
import Axios from "axios";
import Constant from "../constants";

let cancel;
const { CancelToken } = Axios;

export function capturePayPalPaymentAPI(accessToken, capturePaymentURL) {
  return Axios.post(
    `${capturePaymentURL}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((response) => {
      return { ok: true };
    })
    .catch((err) => {
      console.log({ ...err });
      return { ok: false };
    });
}

export function createPayPalOrder(accessToken, amount, credits) {
  const dataDetail = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
    application_context: {
      brand_name: "Kliit Health",
      shipping_preference: "NO_SHIPPING",
      user_action: "CONTINUE",
      return_url: "https://example.com/success",
      cancel_url: "https://example.com/fail",
      payment_method: {
        payer_selected: "PAYPAL",
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
    },
  };

  return Axios.post("https://api.paypal.com/v2/checkout/orders", dataDetail, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      const { id, links } = response.data;
      const approvalUrl = links.find((data) => data.rel === "approve");
      const captureUrl = links.find((data) => data.rel === "capture");
      return {
        approvalUrl: approvalUrl.href,
        capturePaymentURL: captureUrl.href,
        credits: credits,
      };
    })
    .catch((err) => {
      console.log({ ...err });
    });
}

export function getApiHit(url, header) {
  try {
    console.log("\n\n--------------***** Api Hit Start *********-----------");
    console.log("url", `${Constant.App.Api.BaseUrl}${url}`);
    console.log("header", header);
    return Axios.get(`${Constant.App.Api.BaseUrl}${url}`, { headers: header })
      .then((response) => {
        console.log("response", response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return response.data;
      })
      .catch((error) => {
        console.log("error", error.response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return error.response.data;
      });
  } catch (error) {
    return false;
  }
}

export function getApiAsyncHit(url, header) {
  try {
    console.log("\n\n--------------***** Api Hit Start *********-----------");
    console.log("url", `${Constant.App.Api.BaseUrl}${url}`);
    console.log("header", header);
    console.log("cancel", cancel);
    if (cancel) {
      cancel();
    }
    return Axios.get(`${Constant.App.Api.BaseUrl}${url}`, {
      headers: header,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((response) => {
        console.log("response", response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return response.data;
      })
      .catch((error) => {
        console.log("error", error.response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return error.response.data;
      });
  } catch (error) {
    return false;
  }
}

export function getLocationDetail(url, header) {
  try {
    console.log("\n\n--------------***** Api Hit Start *********-----------");
    console.log("url", url);
    console.log("header", header);
    return Axios.get(url, { headers: header })
      .then((response) => {
        console.log("response", response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return response;
      })
      .catch((error) => {
        console.log("error", error);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return error;
      });
  } catch (error) {
    return false;
  }
}

export function postApiHit(url, header, data) {
  try {
    console.log("\n\n--------------***** Api Hit Start *********-----------");
    console.log("url", `${Constant.App.Api.BaseUrl}${url}`);
    console.log("header", header);
    console.log("data", data);
    return Axios.post(`${Constant.App.Api.BaseUrl}${url}`, data, {
      headers: header,
    })
      .then((response) => {
        console.log("response", response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return response.data;
      })
      .catch((error) => {
        console.log("error", error.response);
        console.log("--------------***** Api Hit End *********-----------\n\n");
        return error.response.data;
      });
  } catch (error) {
    console.log("error crash", error);
    return false;
  }
}
