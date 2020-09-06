import React, { useCallback } from "react";
import styled from "styled-components";
import { RowType, roleNameMap } from "./Detail";
import Category from "./Category";
import State from "./State";

type Props = {
	isSelected?: boolean;
	row: RowType;
	onSelect(row: RowType): void;
};

const NameTd = styled.td`
	color: rgb(38, 42, 50);
	font-weight: 600;
`;

export default function Row({ isSelected, row, onSelect }: Props) {
	const handleSelect = useCallback(() => onSelect(row), [onSelect, row]);

	const Tr = useCallback(styled.tr``, [isSelected]);

	return (
		<tr onClick={handleSelect} className={isSelected ? "selected" : undefined}>
			<NameTd>{row.name}</NameTd>
			<td>
				<State state={row.state} />
			</td>
			<td>{roleNameMap[row.role]}</td>
			<td>{row.rating}</td>
			<td>{row.owner.fullName}</td>
			<td>{row.regNumber}</td>
			<td>{row.primaryAddress.address.city}</td>
			<td>{row.category && <Category id={row.category.id} radial />}</td>
		</tr>
	);
}
