import React, { useCallback } from "react";
import styled from "styled-components";
import Category from "./Category";
import State, { StateType, nameMap } from "./State";

type Rating = "A" | "B" | "C";
type Role = "A_SUBSCRIBER" | "B_PARTNER" | "C_SUPPLIER" | "D_RIVAL" | "E_OWN";

export type RowType = {
	id: number;
	name: string;
	rating: Rating;
	role: Role;
	state: StateType;
	owner: { id: number; fullName: string };
	regNumber: number;
	primaryAddress: {
		address: { city: string; street: string; zipCode: string; country: string };
	};
	category?: { id: number; value: string };
};

type Props = {
	row: RowType;
};

export const roleNameMap: { [key in Role]: string } = {
	A_SUBSCRIBER: "Odběratel",
	B_PARTNER: "Partner",
	C_SUPPLIER: "Dodavatel",
	D_RIVAL: "Konkurent",
	E_OWN: "Vlastní firma",
};

const StyledDiv = styled.div`
	border: 3px solid #262a32;
	color: #262a32;
	width: 300px;
	height: 300px;
	padding: 10px 15px;
`;

export default function Detail({ row }: Props) {
	const { state } = row;
	const { address } = row.primaryAddress;
	return (
		<StyledDiv>
			<h4>
				{row.category && <Category id={row.category.id} />}
				<State state={state}>
					{nameMap[state]} {roleNameMap[row.role]}
				</State>
			</h4>
			<h2>{row.name}</h2>
			IČ {row.regNumber}
			<br /> {address.street}
			<br /> {address.zipCode} {address.city}
			<br /> {address.country}
			<h3>Vlastník: {row.owner.fullName}</h3>
		</StyledDiv>
	);
}
