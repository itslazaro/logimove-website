import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins multiple class strings", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "", "bar")).toBe("foo bar");
  });

  it("returns empty string for no truthy inputs", () => {
    expect(cn(false, null, undefined, "")).toBe("");
  });

  it("handles a single class", () => {
    expect(cn("only")).toBe("only");
  });
});
