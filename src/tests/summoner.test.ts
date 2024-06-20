import { encodeSummoner } from "@/utils/helpers";

describe("encodeSummoner", () => {
	it("should be lowercase", () => {
		expect(encodeSummoner("HelloWorld")).toBe("helloworld");
	});

	it("should replace space with +", () => {
		expect(encodeSummoner("Hello World")).toBe("hello+world");
		expect(encodeSummoner("Hello  World ")).toBe("hello+world");
	});

	it("should remove special characters", () => {
		expect(encodeSummoner("Hel!!lo++ #+@++World 123!@#")).toBe(
			"hello+world+123"
		);
	});

	it("should trim multiple + signs", () => {
		expect(encodeSummoner("+++Hello++++World 123+++++")).toBe(
			"hello+world+123"
		);
	});

	it("trim leading and trailing +", () => {
		expect(encodeSummoner("+Hello+World+")).toBe("hello+world");
	});
});
