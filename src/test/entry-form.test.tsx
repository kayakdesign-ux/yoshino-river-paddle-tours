import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EntryForm } from "@/components/EntryForm";

const sendButton = () => screen.getByRole("button", { name: "公式LINEで送信" });
const pick = (label: string, n: number) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value: String(n) } });

const TWO_SEATER = "SUP 2人乗り（大人1名＋未就学1名がセット）";

describe("申込フォーム SUP 2人乗り（大人1名＋未就学1名がセット）", () => {
  it("2人乗りを何も選んでいなければ送信できる", () => {
    render(<EntryForm />);

    expect(sendButton()).toBeEnabled();
  });

  it("大人だけ選んだ状態では送信できない", () => {
    render(<EntryForm />);
    pick(`${TWO_SEATER} 大人`, 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("両方をお選びください");
  });

  it("未就学だけ選んだ状態では送信できない", () => {
    render(<EntryForm />);
    pick(`${TWO_SEATER} 未就学`, 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("両方をお選びください");
  });

  it("大人と未就学が同じ人数なら送信できる", () => {
    render(<EntryForm />);
    pick(`${TWO_SEATER} 大人`, 2);
    pick(`${TWO_SEATER} 未就学`, 2);

    expect(sendButton()).toBeEnabled();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("大人と未就学の人数がズレていたら送信できない", () => {
    render(<EntryForm />);
    pick(`${TWO_SEATER} 大人`, 2);
    pick(`${TWO_SEATER} 未就学`, 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("同じ人数にしてください");
  });
});

describe("申込フォーム 体重80kg", () => {
  it("未選択なら0人として送信文に載る", () => {
    render(<EntryForm />);

    expect(screen.getByText(/体重80kg：0人/)).toBeInTheDocument();
  });

  it("人数を選ぶと送信文に反映される", () => {
    render(<EntryForm />);
    pick("体重80kgの方は何人いますか？", 3);

    expect(screen.getByText(/体重80kg：3人/)).toBeInTheDocument();
    expect(sendButton()).toBeEnabled();
  });
});
