import { Request, Response } from "express";
import {
  MailMessage,
  SimpleRequestParams,
  EstimateRequestParams,
  CallbackRequestParams,
} from "../types";
import Mail from "../utils/mail";

async function sendMessage(message: MailMessage, res: Response) {
  try {
    const messageInfo = await Mail.sendMail(message);

    return res.status(200).json({
      message: "Message sent successfully",
      messageInfo: messageInfo,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

export async function sendSimpleRequest(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    type,
    firstName,
    lastName,
    companyName,
    phoneNumber,
    additionalInfo,
  } = req.body as SimpleRequestParams;

  const message: MailMessage = {
    subject: "Новая заявка",
    text: `Тип: ${type}, имя: ${firstName}, фамилия: ${lastName}, номер телефона: ${phoneNumber}, компания: 
    ${!!companyName ? companyName : "-"}, 
    дополнительная информация: "${!!additionalInfo ? additionalInfo : "-"}"`,
    html: `
    <p><span style="font-weight: bold">Тип: </span>${type}</p>
    <p><span style="font-weight: bold">Имя: </span>${firstName}</p>
    <p><span style="font-weight: bold">Фамилия: </span>${lastName}</p>
    <p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>
    <p><span style="font-weight: bold">Компания: </span>${
      !!companyName ? companyName : "не указано"
    }</p>
    <p><span style="font-weight: bold">Дополнительная информация: </span></p>
    <p>${!!additionalInfo ? additionalInfo : "не указано"}</p>`,
  };

  return await sendMessage(message, res);
}

export async function sendEstimateRequest(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    type,
    firstName,
    lastName,
    companyName,
    phoneNumber,
    productDescription,
    count,
    preferredPrice,
    files,
  } = req.body as EstimateRequestParams;

  const message: MailMessage = {
    subject: "Новая заявка на бесплатный просчет",
    text: `Тип: ${type}, имя: ${firstName}, фамилия: ${lastName}, номер телефона: ${phoneNumber}, компания: 
    ${!!companyName ? companyName : "-"}, 
    описание товара: ${
      !!productDescription ? productDescription : "-"
    }, количество: ${count}, желаемая цена: ${preferredPrice}`,
    html: `
    <p><span style="font-weight: bold">Тип: </span>${type}</p>
    <p><span style="font-weight: bold">Имя: </span>${firstName}</p>
    <p><span style="font-weight: bold">Фамилия: </span>${lastName}</p>
    <p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>
    <p><span style="font-weight: bold">Компания: </span>${
      !!companyName ? companyName : "не указано"
    }</p>
    <p><span style="font-weight: bold">Описание товара: </span></p>
    <p>${!!productDescription ? productDescription : "не указано"}</p>
    <p><span style="font-weight: bold">Количество: </span>${count}</p>
    <p><span style="font-weight: bold">Желаемая цена: </span>${preferredPrice}</p>`,
  };

  return await sendMessage(message, res);
}

export async function sendCallbackRequest(
  req: Request,
  res: Response
): Promise<Response> {
  const { phoneNumber } = req.body as CallbackRequestParams;

  const message: MailMessage = {
    subject: "Новая заявка на обратный звонок",
    text: `Номер телефона: ${phoneNumber}`,
    html: `<p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>`,
  };

  return await sendMessage(message, res);
}
