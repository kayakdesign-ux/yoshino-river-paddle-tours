import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EntryForm } from "@/components/EntryForm";

const sendButton = () => screen.getByRole("button", { name: "公式LINEで送信" });
const pick = (label: string, n: number) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value: String(n) } });

describe("申込フォーム SUP 2人乗り（大人1名＋未就学1名がセット）", () => {
  it("2人乗りを何も選んでいなければ送信できる", () => {
    render(<EntryForm />);

    expect(sendButton()).toBeEnabled();
  });

  it("大人だけ選んだ状態では送信できない", () => {
    render(<EntryForm />);
    pick("SUP 2人乗り 大人", 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("両方をお選びください");
  });

  it("未就学だけ選んだ状態では送信できない", () => {
    render(<EntryForm />);
    pick("SUP 2人乗り 未就学", 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("両方をお選びください");
  });

  it("大人と未就学が同じ人数なら送信できる", () => {
    render(<EntryForm />);
    pick("SUP 2人乗り 大人", 2);
    pick("SUP 2人乗り 未就学", 2);

    expect(sendButton()).toBeEnabled();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("大人と未就学の人数がズレていたら送信できない", () => {
    render(<EntryForm />);
    pick("SUP 2人乗り 大人", 2);
    pick("SUP 2人乗り 未就学", 1);

    expect(sendButton()).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("同じ人数にしてください");
  });
});
