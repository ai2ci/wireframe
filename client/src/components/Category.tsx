import React, { useContext } from "react";
import styled from "styled-components";

export type CategoryType = {
	id: number;
	code01: string;
	code02: string;
};
type Props = {
	id: number;
	radial?: boolean;
	height?: number;
};

export const CategoriesContext = React.createContext<CategoryType[]>([]);

export default function Category(props: Props) {
	const categories = useContext(CategoriesContext);
	const category = categories.find(({ id }) => id === props.id);

	// return (
	// 	<span>
	// 		{JSON.stringify(props)} {JSON.stringify(category)}{" "}
	// 		{JSON.stringify(categories)}
	// 	</span>
	// );
	const Styled = styled.span`
		background-color: #${category.code02};
		border-radius: ${props.radial ? 18 : 4}px;
		padding: 2px 7px;
	`;
	return <Styled>{category.code01}</Styled>;
}
