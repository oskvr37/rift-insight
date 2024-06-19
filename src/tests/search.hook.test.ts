import { renderHook, act } from "@testing-library/react";
import { useSearchHistory } from "@/hooks/search";
import { SERVERS, SERVERS_NORMALIZED } from "@/types";

const RECORD = {
	server: SERVERS[0],
	normalized_server: SERVERS_NORMALIZED[SERVERS[0]],
	summonerName: "test",
	tagLine: "1234",
};

const RECORD_KEY = `${RECORD.summonerName.toLowerCase()}#${RECORD.tagLine.toLowerCase()}`;

describe("useSearchHistory", () => {
	test("should return empty array", () => {
		const { result } = renderHook(() => useSearchHistory());
		expect(result.current.searchHistory).toEqual([]);
	});

	test("should return an array with one record", () => {
		const { result } = renderHook(() => useSearchHistory());

		act(() => {
			result.current.storeRecentSearch(RECORD);
		});

		expect(result.current.searchHistory).toEqual([[RECORD_KEY, RECORD]]);
	});

	test("should clear the search history", () => {
		const { result } = renderHook(() => useSearchHistory());

		act(() => {
			result.current.storeRecentSearch(RECORD);
		});

		act(() => {
			result.current.clearSearchHistory();
		});

		expect(result.current.searchHistory).toEqual([]);
	});

	test("should remove the record", () => {
		const { result } = renderHook(() => useSearchHistory());

		act(() => {
			result.current.storeRecentSearch(RECORD);
			result.current.deleteSearchRecord(RECORD_KEY);
		});

		expect(result.current.searchHistory).toEqual([]);
	});

	test("shouldnt add the same record twice", () => {
		const { result } = renderHook(() => useSearchHistory());

		act(() => {
			result.current.storeRecentSearch(RECORD);
			result.current.storeRecentSearch(RECORD);
		});

		expect(result.current.searchHistory).toEqual([[RECORD_KEY, RECORD]]);
	});

	const LIMIT = 10;

	test(`shouldnt add more than ${LIMIT} records`, () => {
		const { result } = renderHook(() => useSearchHistory());

		for (let i = 0; i < LIMIT + 5; i++) {
			act(() => {
				result.current.storeRecentSearch({
					...RECORD,
					summonerName: i.toString(),
				});
			});
		}

		expect(result.current.searchHistory.length).toBe(LIMIT);
	});

	test("should remove the oldest record when the limit is reached", () => {
		const { result } = renderHook(() => useSearchHistory());

		for (let i = 0; i < LIMIT; i++) {
			act(() => {
				result.current.storeRecentSearch({
					...RECORD,
					summonerName: i.toString(),
				});
			});
		}

		console.log(result.current.searchHistory);

		act(() => {
			result.current.storeRecentSearch(RECORD);
		});

		console.log(result.current.searchHistory);

		expect(result.current.searchHistory.length).toBe(LIMIT);
		expect(result.current.searchHistory[0][1].summonerName).toBe("1");
		expect(result.current.searchHistory[LIMIT - 1][1].summonerName).toBe(
			"test"
		);
	});
});
