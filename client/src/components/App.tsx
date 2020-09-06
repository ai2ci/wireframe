import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import Search from "./Search";
import Detail, { RowType } from "./Detail";
import Table from "./Table";
import { CategoryType, CategoriesContext } from "./Category";

const Styled = styled.div`
	font-family: Roboto, sans-serif;
	color: #555c6b;
`;

let abortController: AbortController;

export default function App() {
	const [isLoaded, setLoaded] = useState(false);
	const [data, setData] = useState<RowType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [selected, setSelected] = useState<RowType | undefined>();
	const handleChange = useCallback(
		async (search) => {
			if (abortController) {
				abortController.abort();
			}
			abortController = new AbortController();
			const { signal } = abortController;
			const urlParams = new URLSearchParams({ fulltext: search });

			setLoaded(false);
			const [companyResponse, categoryResponse] = await Promise.all([
				fetch(`/api/company?${urlParams.toString()}`, { signal }),
				fetch(`/api/companyCategory`, { signal }),
			]);

			const [
				{ data: companyData },
				{ data: categoryData },
			] = await Promise.all([companyResponse.json(), categoryResponse.json()]);

			setData(companyData || []);
			setCategories(categoryData || []);
			setLoaded(true);
		},
		[setData]
	);

	useEffect(() => {
		handleChange("");
	}, []);

	return (
		<CategoriesContext.Provider value={categories}>
			<Styled>
				<h1>Klienti</h1>
				<Search value={""} onChange={handleChange} />
				<br />
				<br />
				<Table
					isLoaded={isLoaded}
					data={data}
					onSelectRow={setSelected}
					selectedRow={selected}
				/>
				{selected && <Detail row={selected} />}
			</Styled>
		</CategoriesContext.Provider>
	);
}
