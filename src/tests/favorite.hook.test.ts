/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import useFavorites from "@/hooks/favorites";
import { SERVERS, SERVERS_NORMALIZED } from "@/types";

const RECORD = {
	server: SERVERS[0],
	normalized_server: SERVERS_NORMALIZED[SERVERS[0]],
	summonerName: "test",
	tagLine: "1234",
};

const RECORD_KEY = `${RECORD.summonerName.toLowerCase()}#${RECORD.tagLine.toLowerCase()}`;

describe("useFavorites", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test("should initialize with an empty array", () => {
		const { result } = renderHook(() => useFavorites());
		expect(result.current.favorites).toEqual({});
	});

	test("should add a favorite", () => {
		const { result } = renderHook(() => useFavorites());

		act(() => {
			result.current.addFavorite(RECORD);
		});

		expect(result.current.favorites).toEqual({ [RECORD_KEY]: RECORD });
	});

	test("should remove a favorite", () => {
		const { result } = renderHook(() => useFavorites());

		act(() => {
			result.current.addFavorite(RECORD);
		});

		act(() => {
			result.current.removeFavorite(RECORD);
		});

		expect(result.current.favorites).toEqual({});
	});

	test("should check if a record is a favorite", () => {
		const { result } = renderHook(() => useFavorites());

		act(() => {
			result.current.addFavorite(RECORD);
		});

		expect(result.current.isFavorite(RECORD)).toBe(true);
	});
});
