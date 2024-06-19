import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks";

describe("useLocalStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test("should initialize with the initial value", () => {
		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue")
		);
		expect(result.current[0]).toBe("initialValue");
	});

	test("should initialize with the value from localStorage", () => {
		localStorage.setItem("testKey", JSON.stringify("storedValue"));
		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue")
		);
		expect(result.current[0]).toBe("storedValue");
	});

	test("should update localStorage when the state changes", () => {
		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue")
		);

		act(() => {
			result.current[1]("newValue");
		});

		expect(localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
		expect(result.current[0]).toBe("newValue");
	});

	test("should handle functions passed to the setter", () => {
		const { result } = renderHook(() => useLocalStorage("testKey", 1));

		act(() => {
			result.current[1]((prev: number) => prev + 1);
		});

		expect(localStorage.getItem("testKey")).toBe(JSON.stringify(2));
		expect(result.current[0]).toBe(2);
	});
});
