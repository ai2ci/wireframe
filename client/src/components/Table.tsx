import React from "react";
import styled from "styled-components";

import Row from "./Row";
import { RowType } from "./Detail";

const StyledTable = styled.table`
	border-spacing: 0;
	font-size: 11px;
	min-width: 700px;

	th {
		background-color: rgb(0, 169, 202);
		color: white;
		text-transform: uppercase;
		font-weight: 500;
	}
	th:first-child {
		border-top-left-radius: 4px;
	}
	th:last-child {
		border-top-right-radius: 4px;
	}

	tr:nth-child(even) {
		background-color: #f9f9fa;
	}
	tr.selected {
		background-color: rgb(224, 252, 212);
	}

	td,
	th {
		text-align: left;
		padding: 5px 7px;
	}

	tbody td {
		border-bottom: rgb(230, 232, 237) solid 1px;
	}
`;

type Props = {
	selectedRow?: RowType;
	isLoaded?: boolean;
	data: RowType[];
	onSelectRow(row?: RowType): void;
};

export default function Table(props: Props) {
	const { isLoaded, data } = props;
	const isAnyRowLoaded = Boolean(data.length);

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Název/Jméno</th>
					<th>Stav</th>
					<th>Vztah</th>
					<th>Rating</th>
					<th>Vlastník</th>
					<th>IČ</th>
					<th>Adresa</th>
					<th>Kategorie</th>
				</tr>
			</thead>
			<tbody>
				{isLoaded &&
					isAnyRowLoaded &&
					data.map((row) => (
						<Row
							onSelect={props.onSelectRow}
							key={row.id}
							row={row}
							isSelected={row === props.selectedRow}
						/>
					))}
				{isLoaded && !isAnyRowLoaded && (
					<tr>
						<td colSpan={8} align="center">
							Kde nic tu nic :(
						</td>
					</tr>
				)}
				{isLoaded || (
					<tr>
						<td colSpan={8} align="center">
							Načítáme ...
						</td>
					</tr>
				)}
			</tbody>
		</StyledTable>
	);
}
