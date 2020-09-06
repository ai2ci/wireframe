import React from "react";

export type StateType =
	| "A_POTENTIAL"
	| "B_ACTUAL"
	| "C_DEFERRED"
	| "D_UNATTRACTIVE";

type Props = {
	state: StateType;
	children?: React.ReactNode;
};

type StateMap = { [key in StateType]: string };

const colorMap: StateMap = {
	A_POTENTIAL: "#C29500",
	B_ACTUAL: "#60AE00",
	C_DEFERRED: "#737C90",
	D_UNATTRACTIVE: "#F47559",
};

export const nameMap: StateMap = {
	A_POTENTIAL: "Potenciální",
	B_ACTUAL: "Aktuální",
	C_DEFERRED: "Odložený",
	D_UNATTRACTIVE: "Nezajímavý",
};

export default function State({ state, children }: Props) {
	if (children) {
		return <span style={{ color: colorMap[state] }}>{children}</span>;
	}
	return <span style={{ color: colorMap[state] }}>{nameMap[state]}</span>;
}
