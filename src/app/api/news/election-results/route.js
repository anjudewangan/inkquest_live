import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET(req) {
  const response = await fetch(
    "https://results.eci.gov.in/PcResultGenJune2024/index.htm"
  );
  const text = await response.text();
  const parsedHtml = parse(text.replaceAll("\r\n", ""));
  const table = parsedHtml.querySelector(".rslt-table");
  const tableRows = table.getElementsByTagName("tbody");
  const electionList = [];
  tableRows.forEach((row) =>
    row.childNodes.forEach((element) => {
      const parsedText = element.innerText.replace(/ +/g, " ");
      if (parsedText.length === 1) return;
      const partyName = parsedText.trim().split(" ").slice(0, -5);
      const won = parsedText.trim().split(" ").slice(-3)[0];
      const leading = parsedText.trim().split(" ").slice(-3)[1];
      const total = parsedText.trim().split(" ").slice(-3)[2];
      electionList.push(
        `${partyName.join(
          " "
        )}: Won: ${won}, Leading:${leading} , Total: ${total}`
      );
    })
  );

  return NextResponse.json({ electionList });
}
